using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.AI;

namespace AInterviewer.Services;

public sealed class YandexGptChatClient : IChatClient
{
    private readonly HttpClient _httpClient;
    private readonly string _folderId;
    private readonly string _modelUri;

    public YandexGptChatClient(
        HttpClient httpClient,
        string apiKey,
        string folderId)
    {
        _httpClient = httpClient;
        _folderId = folderId;

        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Api-Key", apiKey);

        _modelUri = $"gpt://{folderId}/yandexgpt-5-lite";
    }

    public async Task<ChatResponse> GetResponseAsync(
        IEnumerable<ChatMessage> messages,
        ChatOptions? options = null,
        CancellationToken cancellationToken = default)
    {
        var request = new
        {
            modelUri = _modelUri,
            completionOptions = new
            {
                stream = false,
                temperature = options?.Temperature ?? 0.7
            },
            messages = messages.Select(m => new
            {
                role =
                    m.Role == ChatRole.System ? "system" :
                    m.Role == ChatRole.Assistant ? "assistant" :
                    "user",
                text = m.Text
            })
        };
        var requestJson = JsonSerializer.Serialize(
        request,
        new JsonSerializerOptions
        {
            WriteIndented = true
        });

        Console.WriteLine(requestJson);
        var response = await _httpClient.PostAsync(
            "https://llm.api.cloud.yandex.net/foundationModels/v1/completion",
            new StringContent(
                JsonSerializer.Serialize(request),
                Encoding.UTF8,
                "application/json"),
            cancellationToken);

        //response.EnsureSuccessStatusCode();
        var responseBody = await response.Content.ReadAsStringAsync(cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception(
                $"Status: {(int)response.StatusCode}\n{responseBody}");
        }



        var json = await response.Content.ReadAsStringAsync(cancellationToken);

        using var doc = JsonDocument.Parse(json);

        var text = doc.RootElement
            .GetProperty("result")
            .GetProperty("alternatives")[0]
            .GetProperty("message")
            .GetProperty("text")
            .GetString();

        return new ChatResponse(
            new ChatMessage(ChatRole.Assistant, text ?? ""));
    }

    public async IAsyncEnumerable<ChatResponseUpdate> GetStreamingResponseAsync(
        IEnumerable<ChatMessage> messages,
        ChatOptions? options = null,
        [System.Runtime.CompilerServices.EnumeratorCancellation]
        CancellationToken cancellationToken = default)
    {
        var response = await GetResponseAsync(messages, options, cancellationToken);

        yield return new ChatResponseUpdate(
            ChatRole.Assistant,
            response.Text);
    }

    public object? GetService(Type serviceType, object? serviceKey)
        => serviceType.IsAssignableFrom(GetType()) ? this : null;

    public void Dispose()
    {
    }
}