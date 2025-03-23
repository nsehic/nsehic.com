---
title: Spotify Service
description: A REST API that lets you see what music I'm listening to on Spotify
date: 2024-12-25
draft: false
demoURL: https://spotify.nsehic.com/currently-playing
repoURL: https://github.com/nermin-io/spotify-service
---

🎵 What am I listening to on Spotify?

## Overview
The project is a HTTP service that exposes a single endpoint, which returns information about the song I'm currently listening to on Spotify in JSON format.

The service handles all of the complexity of authenticating to the Spotify server and refreshing access tokens.

### Motivation
I'm working on a feature for my website to show the song that I'm currently listening to, so I wanted to have an API to retrieve that information.

Also, this was a good opportunity to learn Go.

### Tech Stack
- Go
- Google Cloud Run
- Google Cloud Build
- Docker
- Terraform

## Architecture
The project follows good separation of concerns. For example, the project has been setup with the following packages, where each package focuses on a specific area of work:
- `cmd/spotifyservice` - The main entry point into the program.
- `apiserver` - Contains all HTTP specific code like setting up routes and handlers.
- `logging` - Contains all logging code, like configuring the logger. Also contains logging helpers.
- `spotify` - All of the Spotify related code which deals with authenticating and make requests to Spotify.
- `trace` - Tracing helpers.

## Challenges
Handling Spotify's OAuth flow was a challenge, as it requires user authorisation before granting access to their currently playing track. This meant implementing a seamless authentication process while ensuring token management and refresh mechanisms worked reliably.

## Best Practices
These are some of the best practices I implemented while building this service.

### Automated Infrastructure
All of the infrastructure that was required for this project (such as load balancers, DNS, TLS/SSL certificates) was automated with Terraform, an Infrastructure as Code (IaC) tool.

The benefits of using Terraform are:
- Infrastructure can be templated and modularised
- Changes and new infrastructure can be provisioned very quickly.
- Can version control the infrastructure and allow the changes to be reviewed.
- It gives you a blueprint for your infrastructure, so you can quickly create new environments.
### Structured Logging
The service is using the Zap structured logging library to output detailed logs, which helps to debug issues in production.

### Multi-stage Docker Builds
A multi-stage Docker build was implemented to keep the size of the final image very small. The service is running on Cloud Run with `min_instances=0`, so small Docker images ensure a quick cold start time.

The stages of the Docker build are:
- `builder` - Uses the `golang` base image, which comes with the go tools pre-installed. The go tools download the dependencies and build the project to output a single binary.
- `production` - Uses the distroless base image and copies over the application binary from the builder stage. This ensures that the final image only has the application and any runtime dependencies.
### Distroless Docker Images
As mentioned above, a distroless image is used in the Docker build process. This ensures that the images only contain the application and its runtime dependencies. The image does not contain package managers, shells, or any other programs that are usually found in a standard Linux distrobution.
As a result, the final image is very compact and container startup times are very quick.

## Learnings
If I was to work on this project again, I would use the Spotify Go libaries for communicating with the Spotify APIs, rather than trying to implement this functionality myself.

Implementing the Spotify functionality myself was fine for this case, as it helped me learn Go and the scope was very small. However, if this project was to expand, it wouldn't make much sense to re-invent the wheel.
