/*                                                                         
* Copyright 2016 IBM Corp.                                                 
*                                                                          
* Licensed under the Apache License, Version 2.0 (the "License");          
* you may not use this file except in compliance with the License.         
* You may obtain a copy of the License at                                  
*                                                                          
*      http://www.apache.org/licenses/LICENSE-2.0                          
*                                                                          
* Unless required by applicable law or agreed to in writing, software      
* distributed under the License is distributed on an "AS IS" BASIS,        
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
* See the License for the specific language governing permissions and      
* limitations under the License.                                           
*/ 



/**
 * Model trained by {@link FPGrowth}, which holds frequent itemsets.
 * @param freqItemsets frequent itemset, which is an RDD of {@link FreqItemset}
 * @classdesc
 */

/**
 * @param {RDD} freqItemsets
 *  @class
 */
var FPGrowthModel = function(freqItemsets) {
    this.logger = Logger.getLogger("FPGrowthModel_js");
    var jvmObject;
    if (freqItemsets instanceof org.apache.spark.mllib.fpm.FPGrowthModel) {
        jvmObject = freqItemsets
    } else {
        jvmObject = new org.apache.spark.mllib.fpm.FPGrowthModel(freqItemsets);
    }

	 JavaWrapper.call(this, jvmObject);

};

FPGrowthModel.prototype = Object.create(JavaWrapper.prototype);

FPGrowthModel.prototype.constructor = FPGrowthModel;



/**
 * Generates association rules for the [[Item]]s in {@link freqItemsets}.
 * @param {float} confidence  minimal confidence of the rules produced
 * @returns {RDD} 
 */
FPGrowthModel.prototype.generateAssociationRules = function(confidence) {
   var javaObject =  this.getJavaObject().generateAssociationRules(confidence);
   return new RDD(javaObject);
};

/**
 * Returns RDD of RDD FreqItemset
 * @returns {RDD}
 */
FPGrowthModel.prototype.freqItemsets = function() {
    var javaObject =  this.getJavaObject().freqItemsets();
    return new RDD(javaObject.toJavaRDD());
};


/**
 * A parallel FP-growth algorithm to mine frequent itemsets. The algorithm is described in
 * [[http://dx.doi.org/10.1145/1454008.1454027 Li et al., PFP: Parallel FP-Growth for Query
 *  Recommendation]]. PFP distributes computation in such a way that each worker executes an
 * independent group of mining tasks. The FP-Growth algorithm is described in
 * [[http://dx.doi.org/10.1145/335191.335372 Han et al., Mining frequent patterns without candidate
 *  generation]].
 *
 * @param minSupport the minimal support level of the frequent pattern, any pattern appears
 *                   more than (minSupport * size-of-the-dataset) times will be output
 * @param numPartitions number of partitions used by parallel FP-growth
 *
 * @see [[http://en.wikipedia.org/wiki/Association_rule_learning Association rule learning
 *       (Wikipedia)]]
 *
 * @classdesc
 */

/**
 * Constructs a default instance with default parameters {minSupport: `0.3`, numPartitions: same
 * as the input data}.
 *
 *  @class
 */
var FPGrowth = function(obj) {
	 
	 this.logger = Logger.getLogger("FPGrowth_js");
    var jvmObject;
    if (obj instanceof org.apache.spark.mllib.fpm.FPGrowth) {
        jvmObject = obj;
    } else {
        jvmObject = new org.apache.spark.mllib.fpm.FPGrowth();
    }
	 JavaWrapper.call(this, jvmObject);

};

FPGrowth.prototype = Object.create(JavaWrapper.prototype);

FPGrowth.prototype.constructor = FPGrowth;



/**
 * Sets the minimal support level (default: `0.3`).
 *
 * @param {float} minSupport
 * @returns {FPGrowth}
 */
FPGrowth.prototype.setMinSupport = function(minSupport) {
   var javaObject =  this.getJavaObject().setMinSupport(minSupport);
   return new FPGrowth(javaObject);
};


/**
 * Sets the number of partitions used by parallel FP-growth (default: same as input data).
 *
 * @param {integer} numPartitions
 * @returns {FPGrowth}
 */
FPGrowth.prototype.setNumPartitions = function(numPartitions) {
   var javaObject =  this.getJavaObject().setNumPartitions(numPartitions);
   return new FPGrowth(javaObject);
};


/**
 * Computes an FP-Growth model that contains frequent itemsets.
 * @param {RDD} data  input data set, each element contains a transaction
 *
 * @returns {FPGrowthModel}  an [[FPGrowthModel]]
 */
FPGrowth.prototype.run = function(data) {
   var data_uw = Utils.unwrapObject(data);
   var javaObject =  this.getJavaObject().run(data_uw);
   return new FPGrowthModel(javaObject);
};

/**
 * Frequent itemset. param: items items in this itemset. Java users should call javaItems() instead. param: freq frequency
 * @classdesc
 * @param {object} items
 * @param {integer} freq
 * @constructor
 */
var FreqItemset = function() {

	this.logger = Logger.getLogger("FreqItemset_js");
	var jvmObject = arguments[0];
	if (arguments.length > 1) {
        var items = Utils.unwrapObject(arguments[0]);
        if (Array.isArray(items)) {
            var list = new java.util.ArrayList();
            items.forEach(function(item){
                list.add(Utils.unwrapObject(item));
            });
            items = list.toArray();
        }
		jvmObject = new org.apache.spark.mllib.fpm.FPGrowth.FreqItemset(items, arguments[1]);
	}
	JavaWrapper.call(this, jvmObject);

};

FreqItemset.prototype = Object.create(JavaWrapper.prototype);

FreqItemset.prototype.constructor = FreqItemset;

/**
 * Returns items in a List.
 * @returns {List}
 */
FreqItemset.prototype.items = function() {

   var javaObject =  this.getJavaObject().javaItems();
   return new List(javaObject);
};

/**
 *
 * @returns {integer}
 */
FreqItemset.prototype.freq = function() {

    return this.getJavaObject().freq();
};