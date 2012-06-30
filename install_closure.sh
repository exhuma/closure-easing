#!/bin/bash
svn checkout http://closure-library.googlecode.com/svn/trunk/ cltmp
mkdir lib
mv cltmp/closure/ lib/
mv cltmp/third_party/ lib/
rm -rf cltmp
