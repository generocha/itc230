let breweries =[
	{brewery:"boscos", address: "Overton Square, 2120 Madison Ave", city: "Memphis", state: "TN", zip: "38104", founded:2008},
    {brewery:"ghost river", address: "827 S Main St", zip: "38106", city: "Memphis", state: "TN", founded:2006},
    {brewery:"wiseacre", address: " 2783 Broad Ave", zip: "38112", city: "Memphis", state: "TN", founded:2005},
	{brewery:"memphis made", address: "768 S. Cooper St.", city: "Memphis", state: "TN", zip: "38104", founded:2013},
    {brewery:"high cotton", address: "598 Monroe Avenue", city: "Memphis", state: "TN", zip: "38103", founded:2014}
];
        
exports.get = (brewery) =>{
    return breweries.find((item) =>{
        return item.brewery == brewery;
    });
}
exports.delete = (brewery) =>{
    let oldLength = breweries.length;
    let newBreweries = breweries.filter((item) =>{
       return item.brewery !== brewery; 
    });
    breweries = newBreweries;
    
    return {deleted:  brewery, total: breweries.length};
}


