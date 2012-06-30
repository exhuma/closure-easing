#!/bin/bash

#
# This file needs to be run if any new dependencies have been added in the 'lu'
# namespace.
#

./lib/closure/bin/build/depswriter.py \
    --root_with_prefix="lu ../../../lu" \
    > demo/deps.js
