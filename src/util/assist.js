/**
 * 向上找到最近指定组件
 */

 function findComponentUpward(context,componentName){

    let parent = context.$parent;
    let name = parent.$options.name;
    while(parent && (!name || (componentName != name))){
        parent = parent.$parent;
        if(parent){
            name = parent.$options.name;
        }
    }
    return parent;
 }
 /**
  * 向上找到所有指定组件
  */
 function findComponentsUpwardAll(context,componentName){
     let parents = []
     let parent = context.$parent;
     let name = parent.$options.name;
     if(parent){
        if(name === componentName){
            parents.push(parent)   
         }
         return parents.concat(findComponentsUpwardAll(parent,componentName))
     }else{
        return [];
     }
 }
 
 /**
  * 向下查找最近指定组件
  */
function findComponentDown(context,componentName){

    const childrens = context.$children;
    let children = null;
    if(childrens.length){
        for(let child of childrens){
            if(child.$options.name === componentName){
                children = child;
                break;
            }else{
                children = findComponentDown(child,componentName)
                if(children) break;
            }
        }
    }
    return children;
}

/**
 * 
 * 向下找到所有指定组件
 */

function findComponentsDownAll(context,componentName){
    return context.$children.reduce((components,child)=>{
        if(child.$options.name == componentName){
            components.push(child)
        }
        const foundChilds = findComponentsDownAll(child,componentName);
        return components.concat(foundChilds)
    },[])
}

/**
 * 查找所有兄弟指定组件
 */

 function findComponentsBrother(context,componentName,exceptMe = true){
    let res = context.$parent.$children.filter(item=>{
        return item.$options.name == componentName
    });
    let index = res.findIndex(item=>{
        item.__uid == context.__uid
    })
    if(exceptMe) res.splice(index,1)
    return res;
 }

 /**
  * 判断参数是否是其中之一
  */
 function oneOf(value,validList){
    return validList.includes(value)
 }

 export {findComponentUpward, findComponentsUpwardAll,  findComponentDown, findComponentsDownAll, findComponentsBrother, oneOf}