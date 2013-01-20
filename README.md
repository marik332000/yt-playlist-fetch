# YouTube Playlist Fetcher

Generates a shell script to download an entire playlist in parallel
using [youtube-dl](http://rg3.github.com/youtube-dl/) and xargs. Use
it here,

 * http://skeeto.github.com/yt-playlist-fetch/

This would be a command-line program except that sifting XML through
anything but browser (DOM) JavaScript is unbearable. It's mostly for
my own personal use.

It uses this API to fetch playlist information,

 * https://developers.google.com/youtube/2.0/developers_guide_protocol_playlists
