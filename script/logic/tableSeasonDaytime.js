/*@author Markus Gündel
 *@class tableSeasonDaytime
 *
 *This is the value how many KWh in every daytime is produced per KW installed(producer) under perfect conditions
 *with the assumption that per KW installed per year 1000 KWh will be produced 
 *Because this is not extendeble, this is not in the database
 * */

var tableSeasonDayTime={
	calculateTable: function()
	{
	  if(season.getSeason()==season.seasonArray[0]) //summer
	  {
	    if(daytime.getDaytime()==daytime.daytimeArray[0])//morning
	    {
		  return 0.7;
		}
		else if(daytime.getDaytime()==daytime.daytimeArray[1])//midday
		{
		  return 3;
		}
		else if(daytime.getDaytime()==daytime.daytimeArray[2])//evening
		{
		  return 0.7;
		}
		else if(daytime.getDaytime()==daytime.daytimeArray[3])//night
		{
		  return 0;
		}
		else
		{
		  return "Fehler";
		}
	  }
	  else if(season.getSeason()==season.seasonArray[1])//autuum
	  {
		if(daytime.getDaytime()==daytime.daytimeArray[0])//morning
		{
		  return 0.3;
		}
		else if(daytime.getDaytime()==daytime.daytimeArray[1])//midday
		{
		  return 2;
		}
		else if(daytime.getDaytime()==daytime.daytimeArray[2])//evening
		{
		  return 0.3;
		}
		else if(daytime.getDaytime()==daytime.daytimeArray[3])//night
		{
		  return 0;
		}
		else
		{
		  return "Fehler";
		}
  }
  else if(season.getSeason()==season.seasonArray[2])//winter
  {
	if(daytime.getDaytime()==daytime.daytimeArray[0])//morning
	{
	  return 0.05;	
	}
	else if(daytime.getDaytime()==daytime.daytimeArray[1])//midday
	{
	  return 1;
	}
	else if(daytime.getDaytime()==daytime.daytimeArray[2])//evening
	{
	  return 0.05;
	}
	else if(daytime.getDaytime()==daytime.daytimeArray[3])//night
	{
	  return 0;
	}
	else
	{
	  return "Fehler";
	}
  }
  else if(season.getSeason()==season.seasonArray[3])//spring
  {
	if(daytime.getDaytime()==daytime.daytimeArray[0])//morning
	{
	  return 0.3;
	}
	else if(daytime.getDaytime()==daytime.daytimeArray[1])//midday
	{
	  return 2;
	}
	else if(daytime.getDaytime()==daytime.daytimeArray[2])//evening
	{
	  return 0.3;
	}
	else if(daytime.getDaytime()==daytime.daytimeArray[3])//night
	{
	  return 0;
	}
	else
	{
	  return "Fehler";
	}
  }
  else{return "Fehler-no Season";}		
 }	
};