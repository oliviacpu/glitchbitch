#!/bin/bash

sudo SDL_VIDEODRIVER=fbcon SDL_FBDEV=/dev/fb0 mplayer -vo sdl -framedrop -loop 0 $1
