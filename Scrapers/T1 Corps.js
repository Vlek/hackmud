function(c,a){
	function repCharAt(str,index,chr) {
		if(index > str.length-1) return str;
		return str.substr(0,index) + chr + str.substr(index+1);
	}
	function prep(x){
		return x.replace(/\`.{2}\`/g,(a,b)=>'\x00');
	}
	function unfuzz(x, y) {
		let i = -1;
		while ((i = x.indexOf("\x00", i+1)) >= 0) {
			x = repCharAt(x, i, y[i]);
		}
		return x;
	}
	function isFuzzed(x){
		if(typeof(x)==="string") return x.includes("\x00");
		return false;
	}
	function req(x, y=a.options){
		if (typeof(x)==="object" && Array.isArray(x)){
			let fuzzed = true;
			while(fuzzed){
				fuzzed = false;
				let z = a.target.call(y);
				for(let i=0;i<x.length;i++){
					x[i] = unfuzz(prep(x[i]),prep(z[i]));
					if (isFuzzed(x[i])) {
						fuzzed = true;
					}
				}					
			}
		} else {
            x = prep(x);
			while (isFuzzed(x)){
				x = unfuzz(x, prep(a.target.call(y)));
			}
		}
		return x;
	}
    
    let d = req(a.target.call()).split('\n');
    d = d[d.length-1].split(' | ').slice(0,2);
    let q = req(a.target.call({}), {}).match(/\w*:"\w*/g);
    
    q = q[q.length-1].split(':"');
    let g = {};
    g[q[0]] = d[1];
    let pass = req(a.target.call(g), g).match(/strategy (\w*)/g)[0].split(" ")[1];
    g[q[0]] = d[0];
    let news = req(a.target.call(g), g), projects = [];
    let project_regexs = [/of the (\S*?) soft/, /(\S*?) announces/, /project (\S*?) has/,
                          /for (\S*?) in/, /continues on (\S*?),/, /review of (\S*?),/,
                           /on (\S*?) P/, /for (\S*?) since/, /review of (\S*),/]; // /date for (\S*?)./,
    for(let n of news){
        for(let r of project_regexs){
            let m = n.match(r);
            if(m&&m.length){
                projects.push(m[1]);
                break;
            }
        }
    }
    projects = projects.filter((i,p)=>projects.indexOf(i)==p)
    return [projects, g];
    g[q[0]] = q[1];
    for(let a of ["p","pass","password"]){
        g[a]=pass;
    }
    let locs = [];
    for(let p=0;p<projects.length;p++){
        g["project"] = projects[p];
        let b = req(a.target.call(g), g);
        if (typeof(b)!=="string"){
            for(let i=0;i<b.length;i++){
                if(b[i].indexOf(">"))continue;
                locs.push(b[i]);
                if(locs.length) return locs.length;
            }
        }
    }
    return locs; //{length: locs.length, locs: locs};
	//return {cmd: q[0], list: q[1], password: pass, locations: projects};
}
