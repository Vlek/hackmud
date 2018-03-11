function(c,a){
    let r="",i,e,g={},
        j=["red","orange","yellow","lime","green","cyan","blue","purple"],
        u=["unlock","open","release"],
        y=['vc2c7q','5c7e1r','4jitu5','vthf6e','tvfkyq','xwz7ja','uphlaw','72umy0','sa23uw','cmppiq','i874y3','9p65cu','pmvr1q','ellux0','eoq6de','fr8ibu','xfnkqe','6hh8xw'],
        w=['c001','c002','c003','EZ_21','EZ_35',"EZ_40","l0cket"],
        p=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97],
        T=()=>r=a.target.call(g),
        N=(x,y)=>g[x]=y,
        Q=(x)=>r.includes(x),
        U=(x)=>Q("UNLOCKED` "+x),
        H=(x)=>U(x)||L(),
        L=()=>Q("terminated"),
        M=(x)=>H(x)||Q("missing"),
        J=(x,y)=>j[(j.indexOf(g[y])+x)%8],
        h = {
        "c001":(x=w[0])=>{
            for(c of j){
                N(x,c)
                if(x==w[0])N("color_digit",c.length)
                T()
                if(M(x))break;
            }
        },
        "c002":()=>{
            h[w[0]](w[1]);
            N("c002_complement",J(4,w[1]))
            T()
        },
        "c003":(x=w[2])=>{
            h[w[0]](x);
            N("c003_triad_1",J(5,x))
            N("c003_triad_2",J(3,x))
            T()
        },
        "EZ_21":(x="EZ_21")=>{
            for(i of u){
                N(x,i);
                T()
                if(M(x))break;
            }
        },
        "EZ_35":(x="EZ_35")=>{
            h[w[3]](x);
            for(e=0;e<10;e++){
                N("digit",e)
                T()
                if(H(x))break;
            }
        },
        "EZ_40":()=>{
            h[w[3]](w[5]);
            for(i of p){
                N("ez_prime",i)
                T()
                if(H(w[5]))break;
            }
        },
        "l0cket":()=>{
            for(i of y){
                N(w[6],i)
                T()
                if(H(w[6]))break;
            }
        }
    };
    T()
    for(i in h){
        for(i in h){
            if (r.includes("`N"+i)){
                h[i]();
				if(L())return r;
            }
        }
    }
    //N("Message",r)
    return r;
}
