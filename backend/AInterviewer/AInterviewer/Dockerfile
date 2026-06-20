FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
#USER $APP_UID
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG Build_CONFIGURATION=Release
#ARG Build_CONFIGURATION=Development
WORKDIR "/src"
COPY ["./AInterviewer/AInterviewer.csproj", "AInterviewer/"]
RUN dotnet restore "./AInterviewer/AInterviewer.csproj"
COPY . .
WORKDIR "/src/AInterviewer"
RUN dotnet build "./AInterviewer.csproj" -c $Build_CONFIGURATION -o /app/build

FROM build AS publish
ARG Build_CONFIGURATION=Release
#ARG Build_CONFIGURATION=Development
RUN dotnet publish "./AInterviewer.csproj" -c $Build_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENV ASPNETCORE_URLS=http://0.0.0.0:8080
ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 8080
ENTRYPOINT ["dotnet", "AInterviewer.dll"]





# CONFIG FOR DEBUG (Attach to process)
#FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
#WORKDIR /app
#EXPOSE 8080
#EXPOSE 443
#
#FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
#ARG Build_CONFIGURATION=Development
#WORKDIR "/src"
#COPY ["./AInterviewer/AInterviewer.csproj", "AInterviewer/"]
#RUN dotnet restore "./AInterviewer/AInterviewer.csproj"
#COPY . .
#WORKDIR "/src/AInterviewer"
#RUN dotnet build "./AInterviewer.csproj" -c $Build_CONFIGURATION -o /app/build
#
#FROM build AS publish
#ARG Build_CONFIGURATION=Development
#RUN dotnet publish "./AInterviewer.csproj" -c $Build_CONFIGURATION -o /app/publish \
    #/p:DebugType=portable \
    #/p:DebugSymbols=true
#
#FROM mcr.microsoft.com/dotnet/sdk:10.0 AS final  
#WORKDIR /app
#COPY --from=publish /app/publish .
#ENV ASPNETCORE_ENVIRONMENT=Development \
    #COMPlus_EnableDiagnostics=1
#RUN apt-get update && apt-get install -y unzip && \
    #curl -sSL https://aka.ms/getvsdbgsh | bash /dev/stdin -v latest -l /vsdbg
#USER root
#
#ENTRYPOINT ["dotnet", "AInterviewer.dll"]