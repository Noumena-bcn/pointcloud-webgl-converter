Point Clouds - WebGL Converter [Docker Implantation]

docker run --rm -v $PWD/test/input:/input -v $PWD/test/output:/output pointcloud-webgl-converter PotreeConverter /input/ripple.las -p perugia -o /output/ripple