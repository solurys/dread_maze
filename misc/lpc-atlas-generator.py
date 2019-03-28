def initAtlas(img, w, h, format):
    return {
        "frames": {},
        "meta": {
            "version": "1.0",
            "image": img,
            "format": format,
            "size": {"w":w, "h":h},
            "scale": "1"
        }
    }

def addFrame(atlas, name, x, y, w=64, h=64):
    atlas['frames'][name] = {
        "frame": {"x":x, "y":y, "w":w, "h":h},
        "rotated": False,
        "trimmed": False,
        "spriteSourceSize": {"x":0, "y":0, "w":w, "h":h},
        "sourceSize": {"w":w, "h":h}
    }

def animLine(atlas, n, basename, y, w=64, h=64, suffix='-'):
    for i in range(0, n):
        x = i*w
        name = basename + suffix + str(i)
        addFrame(atlas, name, x, y, w, h)

def anim4DirLines(atlas, n, basename, y, w=64, h=64):
    animLine(atlas, n, basename+'-up',    y,     w, h)
    animLine(atlas, n, basename+'-left',  y+h,   w, h)
    animLine(atlas, n, basename+'-down',  y+2*h, w, h)
    animLine(atlas, n, basename+'-right', y+3*h, w, h)


def line(l, h=64):
    return l*h

#atlas = initAtlas('skeleton.png', 832, 1344, 'RGBA8888')
atlas = initAtlas('paladin.png', 1536, 2112, 'RGBA8888')

anim4DirLines(atlas, 7, 'spellcast', line(0))
anim4DirLines(atlas, 8, 'thrust', line(4))
anim4DirLines(atlas, 9, 'walk', line(8))
anim4DirLines(atlas, 6, 'slash', line(12))
anim4DirLines(atlas, 13, 'shoot', line(16))
animLine(atlas, 6, 'die', line(20))
#anim4DirLines(atlas, 8, 'dragonSpear', line(21), 192, 192);
anim4DirLines(atlas, 6, 'cudgel', line(21), 192, 192);

import json

print(json.dumps(atlas, sort_keys=True, indent=4))

# python3 lpc-atlas-generator.py > skeleton_atlas.json
