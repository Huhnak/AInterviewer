namespace AInterviewer.DTOs
{
    public enum ErrorType
    {
        Validation,
        NotFound,
        Conflict,
        Failure,
        Custom
    }
    public record Error(int Code, string Description, ErrorType Type)
    {
        public static readonly Error None = new Error(500, string.Empty, ErrorType.Failure);
    }

    public class ApiResult
    {
        public bool IsSuccess { get; }
        public bool IsFailure => !IsSuccess;
        public Error Error { get; }

        protected internal ApiResult(Error error, bool success)
        {
            Error = error;
            IsSuccess = success;
        }

        public static ApiResult Success() =>
            new ApiResult(Error.None, true);

        public static ApiResult Failure(Error error) =>
            new ApiResult(error, false);
    }

    public class ApiResult<TValue> : ApiResult
    {
        public TValue? Value { get; }

        protected internal ApiResult(
            TValue? value,
            Error error,
            bool success)
            : base(error, success)
        {
            Value = value;
        }

        public static ApiResult<TValue> Success(TValue value) =>
            new ApiResult<TValue>(value, Error.None, true);

        public new static ApiResult<TValue> Failure(Error error) =>
            new ApiResult<TValue>(default, error, false);
    }
}
