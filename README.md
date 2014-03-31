FramerWebView
=============

A simple web viewer for Framer.JS prototypes. Replace the iframe src in **index.html** with the URL of your prototype, then open it up in your browser and you're good to go! FramerWebView currently assumes an iPhone sized prototype (640px x 1136px), but I'll be working on an Android version soon.

![FramerWebView Example](https://dl.dropboxusercontent.com/u/144234624/framerwebview.png)

Features
--------
* Resize your browser, prototype automatically scales down
* Hit P to toggle between a black and white iPhone
* Hit H to toggle the hand off and on
* Hit B to cycle through various backgrounds (customize these in the backgrounds array in main.js)
* Mouse cursor is replaced by an easier to track bobble - add this to your prototype's CSS:

```
* {
cursor: url("https://dl.dropboxusercontent.com/u/144234624/bobble.png"), default;
}
```
