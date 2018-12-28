FROM ubuntu:16.04
MAINTAINER Starsky Lara
VOLUME ["/input", "/output"]

RUN apt-get update && apt-get install -y libtiff-dev libgeotiff-dev libgdal1-dev libboost-system-dev \
libboost-thread-dev libboost-filesystem-dev libboost-program-options-dev libboost-regex-dev libboost-iostreams-dev \
git cmake build-essential wget
RUN mkdir /data

WORKDIR /data

RUN git clone https://github.com/m-schuetz/LAStools.git
WORKDIR /data/LAStools/LASzip
RUN mkdir build
RUN cd build && cmake -DCMAKE_BUILD_TYPE=Release -DLASZIP_INCLUDE_DIRS=/data/LAStools/LASzip/dll/ \
-DLASZIP_LIBRARY=/usr/local/lib/liblaszip.so ..
RUN cd build && make && make install && ldconfig

RUN mkdir ./PotreeConverter
WORKDIR /data/PotreeConverter
ADD . /data/PotreeConverter
RUN mkdir build
RUN cd build && cmake -DCMAKE_BUILD_TYPE=Release -DLASZIP_INCLUDE_DIRS=/data/LAStools/LASzip/dll -DLASZIP_LIBRARY=/data/LAStools/LASzip/build/src/liblaszip.so ..
RUN cd build && make && make install
RUN cp -R /data/PotreeConverter/PotreeConverter/resources/ /data/PotreeConverter/build/resources
WORKDIR /data/PotreeConverter/build
CMD PotreeConverter