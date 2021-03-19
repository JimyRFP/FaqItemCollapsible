class faq{

 constructor(className,options){
   this.geralData={
    baseElement:null,
    baseClassName:null,
   } 
   this.geralData.baseClassName=className;
   this.setOptions(options);
   setBaseElementByClassName.bind(this)();   
   this.makeFaq();
   addResizeEvent.bind(this)();
   
   function setBaseElementByClassName(){
   
   const className=this.geralData.baseClassName;
   if(typeof(className)!="string")return false;
   const baseElement=document.getElementsByClassName(className);
   if(baseElement.length==0)return false;
   this.geralData.baseElement=baseElement;
   return true;
   }  
   function addResizeEvent(){
    window.addEventListener("resize",this.refreshElements.bind(this));
   } 

 }
 setOptions(options){
  this.defaultOptions={
  measure:"px",
  initialStatus:"close",
  timerMs:50,
  timerIntervalMs:250,
  addImage:true,
  imageSrc:"svg/arrow.svg",
  imgRotationClose:180,
  imgRotationOpen:0,
  }
  this.options=this.defaultOptions;
 }

 setBaseElementCss(elementIndex){
    let baseElement=this.getBaseElementByIndex(elementIndex);
    baseElement.style.overflow="hidden"; 
    let animationInfo=this.getAnimationInfo(elementIndex,"close");
    this.animateElementHeight(animationInfo,true);   
 }
 setQuestionElementConfig(elementIndex){   
   let questionElement=this.getQuestionElementByIndex(elementIndex);
   if(!questionElement)return;
   insertQuestionElementImage.bind(this)(elementIndex);
   questionElement.style.wordWrap="break-word";
   setChildrenCss(questionElement);

   function setChildrenCss(element){
     let children=null;
     for(let i=0;i<element.children.length;i++){      
       children=element.children[i];
       children.style.display="inline-block";
       children.style.verticalAlign="middle";
     }
   }
  function insertQuestionElementImage(elementIndex){
  if(!this.options.addImage)return;
  let questionElement=this.getQuestionElementByIndex(elementIndex);
  const questionInnerHTML=questionElement.innerHTML;
  let newInnerHTML="<img src=\""+this.options.imageSrc+"\" "+
                    "class=\""+this.getImgClassName()+"\"/>"+questionInnerHTML;
            questionInnerHTML;
  questionElement.innerHTML=newInnerHTML;
  }

 }

 setAnswerElementCss(elementIndex){
  let answerElement=this.getAnswerElementByIndex(elementIndex);
  if(!answerElement)return;
    answerElement.style.wordWrap="break-word";    
 }
 makeFaq (){
  let baseElement=this.getBaseElementArray();
 	for(let i=0;i<baseElement.length;i++){   	     	 
      this.setAnswerElementCss(i);
      this.setQuestionElementConfig(i);  
      this.setBaseElementCss(i);  
      setQuestionOnClickFunction(this,parseInt(i)); 
  }   
  this.refreshElements();
  function setQuestionOnClickFunction(baseObject,baseElementIndex){
   let questionElement=baseObject.getQuestionElementByIndex(baseElementIndex);
   if(!questionElement)return false;
   questionElement.onclick=function(){baseObject.onClickQuestion(baseElementIndex);}
   return true;
 }
  
}
getQuestionElementByIndex(baseElementIndex){
  const questionClassName=this.getQuestionClassName();
  let questionElement=this.getChildrenElementByClassName(baseElementIndex,questionClassName,0);
  return questionElement;
}
getBaseElementByIndex(baseElementIndex){
  return this.geralData.baseElement[baseElementIndex];
}
getImgElementByIndex(elementIndex){
  const questionElement=this.getQuestionElementByIndex(elementIndex);
  const imgClassName=this.getImgClassName();
  let children=null;
  for(let i=0;i<questionElement.children.length;i++){
    children=questionElement.children[i];
    if(this.getClassNameIntoSpace(children.className)==imgClassName)return children;
  }
  return false;
}
getAnswerElementByIndex(baseElementIndex){
  const answerClassName=this.getAnswerClassName();
  let answerElement=this.getChildrenElementByClassName(baseElementIndex,answerClassName,0);
  return answerElement;
}

getNumberOfBaseElements(){
  return this.geralData.baseElement.length;
}


onClickQuestion (elementIndex){
 this.initAnimation(elementIndex);
}

 getChildrenElementByClassName (elementIndex,searchClassName,childrenInit=0){
     let baseElement=this.getBaseElementByIndex(elementIndex);
     for(let j=childrenInit;j<baseElement.children.length;j++){
        if(this.getClassNameIntoSpace(baseElement.children[j].className)!=searchClassName)continue;
        return baseElement.children[j]; 
     }
     return false;
 }
 getBaseElementByIndex(elementIndex){
  return this.geralData.baseElement[elementIndex];
 }
 getBaseElementArray(){
  return this.geralData.baseElement;
 }
 getClassNameIntoSpace (className){
 	var lastInd=className.indexOf(" ");
  if(lastInd<=0)lastInd=className.length;
 	return className.substring(0,lastInd);
 }
 getQuestionClassName (){
 	return this.geralData.baseClassName+"_"+"question";
 }
 getAnswerClassName (){
 	return this.geralData.baseClassName+"_"+"answer";
 }
 getAnimationOnClassName (){
  let questionClassName=this.getQuestionClassName();
 	return questionClassName+" "+this.geralData.baseClassName+"_animationOn";
 }
 isAnimationOn (elementIndex){
  let questionElement=this.getQuestionElementByIndex(elementIndex);
 	if(questionElement.className==this.getAnimationOnClassName())return true;
 	return false;
 }
 getElementStyleHeight(elementIndex){
   let baseElement=this.getBaseElementByIndex(elementIndex);
   return baseElement.style.height;
 }
 initAnimation(elementIndex){
  if(this.isAnimationOn(elementIndex))return;
  let type;
  if(this.elementIsOpen(elementIndex)){
   type="close";
  }else{
   type="open";
  }
  let animationInfo=this.getAnimationInfo(elementIndex,type);
  this.callAnimationTimer(animationInfo);
  this.setQuestionElementAnimationOn(elementIndex);
 }
 setQuestionElementAnimationOn(elementIndex){
   this.changeQuestionElementClassName(elementIndex,this.getAnimationOnClassName());
 }
 setQuestionElementAnimationOff(elementIndex){
   this.changeQuestionElementClassName(elementIndex,this.getAnimationOnClassName());
 }
 elementIsOpen(elementIndex){
  if(this.getElementStyleHeight(elementIndex)=="auto"){
    return true;
  }else{
    return false;
  }
 }
 setQuestionElementClassStatus(elementIndex){
   if(this.elementIsOpen(elementIndex)){
     this.setQuestionElementOpenClassName(elementIndex);
   }else{
     this.setQuestionElementCloseClassName(elementIndex);
   }
 }
 getOpenClassName(){
   const questionClassName=this.getQuestionClassName();
   return questionClassName+" "+this.geralData.baseClassName+"_open"; 
 }
 getCloseClassName(){
   const questionClassName=this.getQuestionClassName();
   return questionClassName+" "+this.geralData.baseClassName+"_close"; 
 }
 getImgClassName(){
   const questionClassName=this.getQuestionClassName();
   return questionClassName+"_img";
 }
 setQuestionElementOpenClassName(elementIndex){
   this.changeQuestionElementClassName(elementIndex,this.getOpenClassName());
 }
 setQuestionElementCloseClassName(elementIndex){
   this.changeQuestionElementClassName(elementIndex,this.getCloseClassName());
 }
 changeQuestionElementClassName(elementIndex,newClassName){
  const questionElement=this.getQuestionElementByIndex(elementIndex);
  questionElement.className=newClassName;
 }
 getAnimationInfo(elementIndex,type){	   
 let animationInfo={
          type:"",
          initialHeight:0,
          finalHeight:0,
          elementIndex:elementIndex,
          heightPass:0,
          imgRotationPass:0,
     };
   let nPeriods=this.options.timerIntervalMs/this.options.timerMs;
   animationInfo.imgRotationPass=Math.abs(this.options.imgRotationOpen-this.options.imgRotationClose)/nPeriods;  
   animationInfo.type=type;
   if(type=="close"){
     animationInfo.initialHeight=this.getOpenHeight(elementIndex);
     animationInfo.finalHeight=this.getCloseHeight(elementIndex);
     animationInfo.heightPass=Math.abs(animationInfo.initialHeight-animationInfo.finalHeight)/
                                       (nPeriods);
     animationInfo.imgRotationPass=(this.options.imgRotationClose-this.options.imgRotationOpen)/nPeriods;                               

   }else{
     animationInfo.initialHeight=this.getCloseHeight(elementIndex);
     animationInfo.finalHeight=this.getOpenHeight(elementIndex);
     animationInfo.heightPass=Math.abs(animationInfo.initialHeight-animationInfo.finalHeight)/
                                       ((nPeriods)-1);
     animationInfo.imgRotationPass=(this.options.imgRotationOpen-this.options.imgRotationClose)/nPeriods;                                    
   }
   return animationInfo;
  }
 callAnimationTimer (animationInfo){
   var newTimer ={
        timerId:null,
        timerEnd:false,
        timerMs:this.options.timerMs,
        timerIntervalMs:this.options.timerIntervalMs,
        timerCount:0
    };
    const timerIndex=timerControl.getTimerIndex();
    const callBackTimerFunction=function(){
     this.timerFunction(animationInfo,timerIndex);
    }.bind(this);
    const timerControlFunction=function(){
       timerControl.timerEvent(timerIndex,callBackTimerFunction);
    }

    newTimer.timerId=setInterval(timerControlFunction,
                                 newTimer.timerMs
                                 );
    timerControl.addNewTimer(newTimer,timerIndex);
    
 }
 timerFunction (animationInfo,timerIndex){
    const timerIsEnd=timerControl.isTimerEnd(timerIndex);
    this.animateElementHeight(animationInfo,timerIsEnd);
 }
 getOpenHeight (elementIndex){
 	var totalHeight=this.getCloseHeight(elementIndex);
 	const answerClassName=this.getAnswerClassName();
 	const answerElement=this.getChildrenElementByClassName(elementIndex,answerClassName);
    if(!answerElement)return 0;
    totalHeight+=this.getElementTotalHeight(answerElement);
    return totalHeight;
 }
 getCloseHeight (elementIndex){
 	const questionElement=this.getChildrenElementByClassName(elementIndex,this.getQuestionClassName());
 	if(!questionElement)return 0;
 	return this.getElementTotalHeight(questionElement);
 }
 getElementTotalHeight(element){
 	  const css=getComputedStyle(element);
    var totalHeight=element.offsetHeight;
    totalHeight+=parseInt(css.marginTop);
    totalHeight+=parseInt(css.marginBottom);
    return totalHeight;
 }

 animateElementHeight(animationInfo,animationIsEnd){
      let newHeight=0;
      let baseElement=this.getBaseElementByIndex(animationInfo.elementIndex);
      this.setImgRotateDeg(animationInfo.elementIndex,
                           this.getImgDeg(animationInfo.elementIndex)+animationInfo.imgRotationPass
                          );
      switch(animationInfo.type){
      case "open":
        if(animationIsEnd){
          this.setQuestionElementOpenClassName(animationInfo.elementIndex);
          newHeight="auto";  
          this.setImgRotateDeg(animationInfo.elementIndex,this.options.imgRotationOpen);        
          break;
        }
        newHeight=(parseInt(baseElement.style.height)+animationInfo.heightPass)+this.options.measure;
        break;
      case "close":
        if(animationIsEnd){
          this.setQuestionElementCloseClassName(animationInfo.elementIndex);
          newHeight=animationInfo.finalHeight+this.options.measure; 
          this.setImgRotateDeg(animationInfo.elementIndex,this.options.imgRotationClose); 
          break;
        }
        if(baseElement.style.height=="auto"){
          baseElement.style.height=animationInfo.initialHeight+this.options.measure;
        }
        newHeight=(parseInt(baseElement.style.height)-+animationInfo.heightPass)+this.options.measure;
        break;    
    };
    baseElement.style.height=newHeight;
 }
 setImgRotateDeg(imgIndex,deg){
  let imgElement=this.getImgElementByIndex(imgIndex);
  this.getImgDeg(imgIndex);
  if(!imgElement)return false;
  imgElement.style.transform="rotate("+deg+"deg)";
  return true;
 }
 getImgDeg(imgIndex){
  let imgElement=this.getImgElementByIndex(imgIndex);
  if(!imgElement)return 0;
  let imgDeg=getInt(imgElement.style.transform);
  if(imgDeg==NaN)return 0; 
  return imgDeg;
  function getInt(rotateString){
     let stringToParse="";
     let asc2Char;
     for(let i=0;i<rotateString.length;i++){
        asc2Char=rotateString.charCodeAt(i);
        if( (asc2Char>47 && asc2Char<58) || asc2Char==46)stringToParse+=rotateString.charAt(i);
     }
     return parseInt(stringToParse);
   }
 }
 refreshElements(){
  let baseElements=this.getBaseElementArray();
  let animationInfo;
  for(let i=0;i<baseElements.length;i++){
    if(this.elementIsOpen(i))continue;
    animationInfo=this.getAnimationInfo(i,"close");
    this.animateElementHeight(animationInfo,true);
  }
  this.refreshImgSize();
 }

 getQuestionElementMaxFontSize(elementIndex){
   const questionElement=this.getQuestionElementByIndex(elementIndex);
   let elmStyle;
   let maxFontSize=0;
   for(let i=0;i<questionElement.children.length;i++){
     elmStyle=getComputedStyle(questionElement.children[i]);
     maxFontSize=Math.max(maxFontSize,parseInt(elmStyle.fontSize));
   }
   return maxFontSize;
 }

 refreshImgSize(){
   let imgElement=null;
   let imgHeight=0;
   for(let i=0;i<this.getNumberOfBaseElements();i++){
     imgElement=this.getImgElementByIndex(i);
     if(!imgElement)continue;
     imgHeight=this.getQuestionElementMaxFontSize(i);
     imgElement.style.height=imgHeight+this.options.measure;
   }
 }
 


}

