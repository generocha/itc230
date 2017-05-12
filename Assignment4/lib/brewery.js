let breweries =[
	{name:"boscos", address: "Overton Square, 2120 Madison Ave", city: "Memphis", state: "TN", zip: "38104", founded:2008},
    {name:"ghost river", address: "827 S Main St", zip: "38106", city: "Memphis", state: "TN", founded:2006},
    {name:"wiseacre", address: " 2783 Broad Ave", zip: "38112", city: "Memphis", state: "TN", founded:2005},
	{name:"memphis made", address: "768 S. Cooper St.", city: "Memphis", state: "TN", zip: "38104", founded:2013},
    {name:"high cotton", address: "598 Monroe Avenue", city: "Memphis", state: "TN", zip: "38103", founded:2014}
];

exports.get = (brewery) =>{
    return breweries.find((item) =>{
        return item.name == brewery;
    });
}
exports.add = (brewery) =>{
	let found = this.get(brewery.name);
	if (!found) {
    breweries.push(brewery);
	}
	return {added: !found, total: breweries.length};
}
exports.delete = (brewery) =>{
    let oldLength = breweries.length;
    let newBreweries = breweries.filter((item) =>{
       return item.name !== brewery;
    });
    breweries = newBreweries;
    return {deleted: (oldLength !== breweries.length), total: breweries.length};
}

/*
var newBrewery = {name:"new brewery", address: "598 Monroe Avenue", city: "Memphis", state: "TN", zip: "38103", founded:2014}
console.log(this.add(newBrewery));
console.log(this.add(newBrewery));
*/
