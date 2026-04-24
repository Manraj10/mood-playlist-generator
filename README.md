# Mood-Based Playlist Generator

A browser-based music discovery app that combines mood-based recommendation logic with live data from Apple's iTunes Search API. Instead of returning a fake playlist concept, it maps each mood profile to a real catalog query and displays actual songs.

## Overview

The app lets a user:

- choose a mood
- set an energy level
- optionally add an artist or keyword
- generate a playlist concept
- pull matching songs from a live external API

## Built with

- HTML
- CSS
- JavaScript
- iTunes Search API

## Features

- mood and energy based recommendation profiles
- optional custom query refinement
- live song results from a public music API
- artwork, artist, album, and iTunes links
- front-end only implementation with no backend required

## Running locally

Open `index.html` in a browser.

## API Notes

This project uses Apple's iTunes Search API with query parameters such as:

- `term`
- `media=music`
- `entity=song`
- `limit`
- `country=us`

Official docs:

- https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/
- https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html

## Notes

The mood logic is client-side, while the track list is live. That combination keeps the app lightweight while still making it feel like a real API-backed project instead of a static front-end demo.
