

#ifndef POTREE_CONVERTER_H
#define POTREE_CONVERTER_H

#include "AABB.h"
#include "CloudJS.hpp"
#include "definitions.hpp"
#include "PointReader.h"

#include <string>
#include <vector>
#include <cstdint>

using std::vector;
using std::string;

namespace Potree{

class SparseGrid;

class PotreeConverter{

private:
	AABB aabb;
	vector<string> sources;
	string workDir;
	CloudJS cloudjs;
	PointAttributes pointAttributes;

	PointReader *createPointReader(string source, PointAttributes pointAttributes);
	void prepare();
	AABB calculateAABB();
	void generatePage(string name);

public:
	float spacing;
	int maxDepth;
	string format;
	OutputFormat outputFormat;
	vector<string> outputAttributes;
	vector<double> colorRange;
	vector<double> intensityRange;
	double scale = 0.01;
	int diagonalFraction = 250;
	vector<double> aabbValues;
	string pageName = "";
	string pageTemplatePath = "";
	StoreOption storeOption = StoreOption::ABORT_IF_EXISTS;
	string projection = "";
	bool sourceListingOnly = false;
	ConversionQuality quality = ConversionQuality::DEFAULT;
	string title = "Noumena PointCloud Viewer";
	string autorPage = "Noumena.io";
    string descriptionPage = "http://noumena.io";
    string description = "";
	bool edlEnabled = false;
//	bool showSkybox = false;
	int backgroundType = 2;
	string material = "RGB";
    string executablePath;
	int storeSize = 20'000;
	int flushLimit = 10'000'000;
    string csvdir = "";
	string csvrgba = "";
	string csvndvi = "";
	string csvthrm = "";
    string jsondir = "";
    string jsonstats = "";

    PotreeConverter(string executablePath, string workDir, vector<string> sources);
		
	void convert();

};

}

#endif
