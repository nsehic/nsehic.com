---
title: Itemised
description: Itemised is a todo list app that syncs content to your device.
date: 2023-05-14
draft: false
demoURL: https://itemised.vercel.app
repoURL: https://github.com/nermin-io/itemised
---

🚀 Write todos that instantly sync to your device.

## Overview
Itemised is a todo list application that stores content on your device rather than a remote server or database. This allows you to quickly write some todo items without needing to create an account.

However, it's also much more than a simple todo application. The app has many advanced features as such scheduling, import/export, drag & drop, and more.

### Tech Stack
Itemised is powered by the following technologies, accompanied with an explanation of their purpose.

#### React
All of the UI has been implemented with React, providing a much better developer experience of building complex UIs as opposed to bare bones Javascript.

#### Next.js
Next.js is used to do Server-Side rendering (SSR).

#### dnd-kit
The dnd-kit library was used to implement the drag & drop functionality.

#### Typescript
All of the code is written in Typescript to ensure type safety across the project and reduces the possibility of some common runtime errors.

#### Framer Motion
The UI has some smooth animations which was implemented with Framer Motion.

#### Class Variance Authority (CVA)
Supports creating variants of UI components. For example, this project has different 'variants' of buttons, such as `primary`, `secondary`, `media`.

CVA makes it easier to declaratively define the variants and the styles attached to those variants. Then you can simply pass the variant in as a prop to your component.

#### Radix UI
Radix is a set of unstyled components that makes it easier to build accessible user interfaces. In a nutshell, Radix components only implement the behaviour of the UI, but leave the styling completely up to developers.

#### date-fns
The `date-fns` library was used to simplify the manipulation of dates. The app has advanced scheduling features which was made possible with `date-fns`.

Although there are many date libraries for Javascript, the decision to use `date-fns` was due to it's simple API and relatively small size (17.5kB gzip).

### Features
These are some of the features that makes Itemised great.

#### Todo Editor
Users are presented with an editor modal when creating a task, allowing them to provide more context, whereas many other todo apps only support writing the title.

#### Scheduling and Due Dates
Users can select when a todo is due using the date picker. Todos are sorted by due date, ensuring users focus on the most time-sensitive tasks first. Additionally, todos can be rescheduled if the deadline can no longer be met.

#### Import/Export
Need to move the todos to a different device? No problem! Itemised supports exporting and importing, so you don't need to manually enter all the todos on the new device.

#### Drag and Drop
Users can drag and drop the todo items to change the sort order. If multiple todos have the same deadline, users can sort the todos according to their importance.

## Architecture
Itemised is a single page application (SPA) where the UI has been isolated from the logic that stores the todos. In order to achieve this, the UI components have been wrapped in 'provider' components which export the functionality via context hooks.

Currently the todos are stored in local storage, but I can easily swap out the implementation in the future to upload the todos to a server or some type of database. This can be done by modifying the provider component, or even create a new provider component based on the same context to add this new functionality.

With this approach, different storage mechanisms can be used without ever needing to change the UI.

## Challenges
Although the app is conceptually simple, there were a few challenges during development.

### Verifying the integrity of exported files
One of my concerns while working on the import/export feature was the possibility of importing modified files.
```
Export File -> Unexpected modification of file -> Import incorrect data
```
Users shouldn't be required to inspect the exported file to verify its validity, so they should be given the confidence that the file they are importing is correct.

The solution I came up with was to base64 encode the export data and store it in the file as a key. When the file is imported again, the data from the file is base64 encoded and compared to the key in the file; if there is a mismatch the import is denied.
In hindsight, base64 is not the best solution for this purpose but it was good middle ground.
### Storing user settings
The app has a feature that allows users to toggle whether completed tasks are rendered. One requirement that I came up with was that the toggle state should be persisted across sessions.

But where should the toggle state be stored? It's not really task data so the storage 'provider' used for persisting tasks should not be used. Ideally, the persistence mechanisms for tasks and user settings should be isolated.

The solution that I came up with was to implement a 'UserSettingsProvider' which wraps the UI components. For the initial version, user settings are also stored in local storage, but are separated from the task data.
If I wanted to store the user settings on a server in a future revision, the change would not be too difficult.

## Best Practices
During the development of Itemised the below best practices were implemented.

### CI/CD
Incoming pull requests are continually built and tested to ensure a smoother integration into the codebase. Additionally, all changes to the main branch are automatically built and deployed, allowing me to ship new features very quickly.

### Extensible Architecture
By wrapping the UI components with 'providers', it allows the application to be easily extensible. For example, the providers currently store the user settings and task data in local storage, but the implementation could be easily updated or swapped out to store the data elsewhere, without changing any of the UI code.
This is a powerful advantage and allows the application to be very pluggable.

## Learnings
Here's what I learned during the development of the project and what I would do differently if I worked on this project again.
### Next.js
Although Next.js is great, it was absolutely not required for this app. I didn't end up using any Next.js features and the app behaves more like an SPA.
In fact, using Next.js added some unnecessary complexity. For example, I had to add some checks for browser APIs (local storage), so that it wouldn't fail when Next.js was running on the server.

In hindsight, using React with a build tool like Vite would've been fine.

### Export Keys
I used base64 for verifying the integrity of the export files. The problem with base64 is that the key is reproducible. For example, someone could modify the data, then regenerate the base64 key based on the new data and update the key.

In hindsight, using a secret-based hashing mechandism (like HMAC) would've been ideal, since the key won't be reproducible without the original secret.
