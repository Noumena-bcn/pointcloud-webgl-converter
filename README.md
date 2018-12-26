Point Clouds - WebGL Converter [Custom Potree Converter implementation]
===========================


Strategies for Point clouds and the automation of data fusion of Thermal  and Muti-spectral imagery, - based building \
geometry model generation on `COLMAP <https://colmap.github.io>`_

Existing cities represent the greatest opportunity to improve building energy efficiency. Cities energy  analysis is \
becoming increasingly important because the data visualisation can results and can assist in the decision makers to \
make decisions on improving the cities energy efficiency and reducing environmental impacts. The primary objective of\
this research is to automatically collect and reconstruct and merge data imagery into geometry data que can \
visualize as thermal data of the cities envelope  and create a PointCloud geometry model that enved more of one set \
of data.
In the proposed or imagery recollection, a rapid and low-cost data collection hardware system was designed by \
integrating Thermal and an Multi-spectral cameras. Secondly, several algorithms were created to automatically \
recognize images envelope as objects from collected raw data. The extracted 3D geometric model was then automatically \
saved as an industry standard file format for data interoperability.
The contributions of this research include 1) a customized low-cost hybrid data collection system development to fuse \
various data into a thermal point cloud; 2) an automatic method of extracting cities envelope components and its \
geometry data to generate PointClouds. The broader impacts of this research are that it could offer a new way to \
collect as is cities data without impeding occupants’ daily life, and provide an easier way for laypeople to understand \
the energy and vegetation performance of de cities by 3D thermal and NDVI  point cloud visualization.


## PotreeConverter Usage

Converts las files to the potree file format.
You can list multiple input files. If a directory is specified, all files
inside the directory will be converted.

Options:


```
$ PotreeConverter -h                                      
  -i [ --source ]                        input files
  -h [ --help ]                          prints usage
  -p [ --generate-page ]                 Generates a ready to use web page with the given name.
  -o [ --outdir ]                        output directory
  -s [ --spacing ]                       Distance between points at root level. Distance halves each level.
  -d [ --spacing-by-diagonal-fraction ]  Maximum number of points on the diagonal in the first level (sets spacing). spacing = diagonal value
  -l [ --levels ]                        Number of levels that will be generated. 0: only root, 1: root and its children, ...
  -f [ --input-format ]                  Input format. xyz: cartesian coordinates as floats, rgb: colors as numbers, i: intensity as number
  --color-range
  --intensity-range
  --output-format                        Output format can be BINARY, LAS or LAZ. Default is BINARY
  -a [ --output-attributes ]             can be any combination of RGB, INTENSITY and CLASSIFICATION. Default is RGB.
  --scale                                Scale of the X, Y, Z coordinate in LAS and LAZ files.
  --aabb                                 Bounding cube as "minX minY minZ maxX maxY maxZ". If not provided it is automatically computed
  --incremental                          Add new points to existing conversion
  --overwrite                            Replace existing conversion at target directory
  --source-listing-only                  Create a sources.json but no octree.
  --projection                           Specify projection in proj4 format.
  --list-of-files                        A text file containing a list of files to be converted.
  --source                               Source file. Can be LAS, LAZ, PTX or PLY
  --title                                Page title
  --description                          Description to be shown in the page.
  --edl-enabled                          Enable Eye-Dome-Lighting.
  --show-skybox
  --material                             RGB, ELEVATION, INTENSITY, INTENSITY_GRADIENT, RETURN_NUMBER, SOURCE, LEVEL_OF_DETAIL
```

Examples:

    # convert data.las and generate web page.
    ./PotreeConverter.exe C:/data.las -o C:/potree_converted -p pageName

    # generate compressed LAZ files instead of the default BIN format.
    ./PotreeConverter.exe C:/data.las -o C:/potree_converted --output-format LAZ

    # convert all files inside the data directory
    ./PotreeConverter.exe C:/data -o C:/potree_converted

    # first, convert with custom bounding box and then append new_data.las afterwards.
    # points in new_data MUST fit into bounding box!
    ./PotreeConverter.exe C:/data -o C:/potree_converted -aabb "-0.748 -2.780 2.547 3.899 1.867 7.195"
    ./PotreeConverter.exe C:/new_data.las -o C:/potree_converted --incremental

	# tell the converter that coordinates are in a UTM zone 10N projection. Also, create output in LAZ format
	./PotreeConverter.exe C:/data -o C:/potree_converted -p pageName --projection "+proj=utm +zone=10 +ellps=GRS80 +datum=NAD83 +units=m +no_defs" --overwrite --output-format LAZ

	# using a swiss projection. Use http://spatialreference.org/ to find projections in proj4 format
	./PotreeConverter.exe C:/data -o C:/potree_converted -p pageName --projection "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs" --overwrite
