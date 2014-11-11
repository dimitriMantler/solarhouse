/* This is the George Marsaglia Algorithm, on the Polar-Method. 
 * 2 equal distributed randomnumbers create one normal distributed randomnumber */
var gaussianDistribution={
		myRandom:0,
		
		gauss:function(middle,stdVar)
		{
			gaussianDistribution.myRandom=Math.round(gaussianDistribution.normal(middle,stdVar));
		},
		
		normal:function(middle,stdVarianz)
		{
		  var u1;
	      var u2;
		  var q = 2;
		  while (q == 0 || q>1) {
		  u1 = 2 * Math.random() - 1;
		  u2 = 2 * Math.random() - 1;
		  q = u1 * u1 + u2 * u2;
		  }
		  q= Math.sqrt((-2 * Math.log(q)) / q);
			 
		  var z = (stdVarianz * u1 * q) + middle;
		  return z;
		}
};

