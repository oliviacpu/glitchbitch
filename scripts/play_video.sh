#!/bin/bash

SDL_VIDEODRIVER=fbcon SDL_FBDEV=/dev/fb0 mplayer -vo sdl -framedrop $1
