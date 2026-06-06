FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
#ARG Build_CONFIGURATION=Release
ARG Build_CONFIGURATION=Development
WORKDIR "/src"
COPY ["./AInterviewer/AInterviewer.csproj", "AInterviewer/"]
RUN dotnet restore "./AInterviewer/AInterviewer.csproj"
COPY . .
WORKDIR "/src/AInterviewer"
RUN dotnet build "./AInterviewer.csproj" -c $Build_CONFIGURATION -o /app/build

FROM build AS publish
#ARG Build_CONFIGURATION=Release
ARG Build_CONFIGURATION=Development
RUN dotnet publish "./AInterviewer.csproj" -c $Build_CONFIGURATION -o /app/publish /p:aseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AInterviewer.dll"]
