#!/bin/bash

./lib/closure/bin/build/closurebuilder.py \
    --root=lib/closure/ \
    --root=lib/third_party/ \
    --root=lu/ \
    --root demo/ \
    --namespace='lu.albert.closure.fx.easing.demo' \
    --output_mode=script \
    --compiler_jar=/mnt/data/shared/exhuma/work/__lib__/closure-compiler/compiler.jar
