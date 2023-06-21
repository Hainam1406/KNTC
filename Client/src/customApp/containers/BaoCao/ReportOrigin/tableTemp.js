import React, { useEffect, useState,useLayoutEffect,useRef } from 'react'
import PageWrapper from './table.styled'

const Table = ({tableHeader,tableData,ChiTietDonThu,setStep,step}) => {
    const [detailsTable,setDetailsTable] = useState({})
    const [showTable,setShowTable] = useState(false)
    const ref = useRef()
    const formatListTree = (list,Cap = 0) => {
        Cap++ 
        list.forEach((item,index) => {
            if(item.DataChild){
                item.Cap = Cap
            }else {
                item.Cap = Cap
            }
            if(index === list.length - 1){
                const findChilds = list.filter(item => item.DataChild)
                // Cap++
                findChilds.forEach(item => {
                    formatListTree(item.DataChild,Cap)
                })
            }
        })
    }  



    const handleRenderHeaderTreeV2 = () => {
        const propsThead = {
            Name : '',
            props : {
                className : '',
                children : []
            }
        }
        const mapTree = (list,itemParent) => {
            list.map(item => {
                if(item.DataChild){
                    const propsTH = {
                        Name : '',
                        props : {
                        },
                        propsChild : []
                    }
                    const propsTR = {
                        Name : '',
                        props : {
                        },
                        propsChild : []
                    }
                  if(!item.DataChild){
                    propsTH.props.rowSpan = 0 
                  }
                  propsTR.props.id = itemParent?.Cap
                  propsTH.props.id = item.ID
                  let findGroupParent 
                  // get group parent of current item
                  const getGroupParent = (listITem,Cap) => {
                      listITem.forEach(item => {
                        if(item.props.propsChild && item.props.propsChild.length > 0){
                            if(String(item.props.id) === String(Cap)){
                                findGroupParent = item
                            }else {
                                getGroupParent(item.props.propsChild,Cap?.toString())
                            }
                        }else {
                            if(String(item.props.id) === String(Cap)){
                                findGroupParent = item
                            }
                        }
                    })
                  }
                  getGroupParent(propsThead.props.children ? propsThead.props.children : [],itemParent?.Cap)
    
                  propsTH.props.className += "parent__group"
                  // caculator colspan for each item
                  const getItemColspan = (list,itemFind) => {
                      let initColspan = 0
                      const getMaxColSpan = (list,itemFind,maxLengthS = 0) => {
                          if(itemFind){
                            list.map(item => {
                                if(item.ID === itemFind.ID){
                                    if(item.DataChild){
                                        getMaxColSpan(item.DataChild,null)
                                    }else {
                                    }
                                }else if(item.DataChild && item.ID !== itemFind.ID) {
                                  getMaxColSpan(item.DataChild,itemFind)
                                }
                            })
                          }else {
                            list.map(item => {
                                if(item.DataChild){
                                    getMaxColSpan(item.DataChild,null,initColspan)
                                }else {
                                  initColspan+=1
                                }
                            })
                          }
                      }
                      getMaxColSpan(list,itemFind)
                      return initColspan
                  }
                  
                  propsTH.props.colSpan =  getItemColspan(list,item)  
                  propsTH.Name = item.Name
                  const th = React.createElement('th',{...propsTH.props},[propsTH.Name])
                  const tr = React.createElement('tr',{...propsTR.props},[th],)
                  if(findGroupParent){
                    let isContains = false
                    const arrChilds = findGroupParent.props.children
                    if(arrChilds){
                        for (let i = 0; i < arrChilds.length; i++) {
                          if(Number(arrChilds[i].props?.id) === Number(item.ID)){
                            isContains = true
                          }
                        }
                    }
                    // check if group parent not include item 
                    if(!isContains){
                        findGroupParent.props.children.push(th)
                    }
                  }else {
                    // if not have group parent then push item to rootable
                    propsThead.props.children.push(tr)
                  }
                  mapTree(item.DataChild,item)
                  
                }else {
                    const propsTH = {
                        Name : '',
                        props : {
                        },
                        propsChild : [],
                        style : ''
                    }
                    const propsTR = {
                        Name : '',
                        props : {
                        },
                        propsChild : []
                    }
                  propsTH.Name = item.Name
                  propsTH.style = item?.Style
                  propsTR.props.id = itemParent?.Cap ? itemParent?.Cap : 0
                  propsTH.props.id = item.ID
                  if(!item.DataChild){
                    propsTH.props.rowSpan = 0 
                  } 
                  propsTR.id = itemParent?.Cap ? itemParent?.Cap : 0
                  let findGroupParent 
                  // get group parent of current item
        
                  const getGroupParent = (listITem,Cap) => {
                      listITem.forEach(item => {
    
                          if(item.props?.children && item.props?.children.length > 0){
                          if(item?.props?.id === Cap){
                              findGroupParent = item
                          }else {
                            getGroupParent(item.props.children,Cap?.toString())
                          }
                      }else {
                       
                          if(String(item?.props?.id) === String(Cap)){
                              findGroupParent = item
                          }
                      }
                  })
                }
                getGroupParent(propsThead.props.children,itemParent?.Cap ? itemParent?.Cap : 0)
                  const th = React.createElement('th',{...propsTH.props},[propsTH.Name])
                  const tr = React.createElement('tr',{...propsTR.props},[th])
    
                  if(findGroupParent){
                    let isContains = false
                    const arrChilds = findGroupParent.props.children

                    if(arrChilds){
                        for (let i = 0; i < arrChilds.length; i++) {
                            if(Number(arrChilds[i].props?.id) === Number(item.ID)){
                              isContains = true
                            }
                        }
                    }
                    if(!isContains){
                        findGroupParent.props.children.push(th)
                    }
                  }else {
                    propsThead.props.children.push(tr)
                  }
                }
              })
            }
            formatListTree(tableHeader)
            mapTree(tableHeader)
            const thead = React.createElement('thead',...propsThead.props.children)
            return thead
    }

    const beforeHandleRenderHeaderRow = () => {
        const rootTbody = {
            Name :  '',
            props : {
                className : '',
                children : [],
                id : 'rootTbody'
            }
        }
        handleRenderRowsTable(rootTbody,tableData,tableData)
        const tbody = React.createElement('tbody',{...rootTbody.props},[...rootTbody.props.children])
        return tbody
    }

    const handleRemoveActiveCurrent = (item,rootTbody,list) => {
        // get all item from DOM have same parent active
        const getIdDataChilds = document.querySelectorAll(`[data-id__parent="${item.ParentID}"]`);
        const listTotalCHild = [...rootTbody.children]
        Array.isArray(listTotalCHild)
        const listIdChilds = []
        const FindChilds = list  => {
            list.forEach(item => {
                if(item.DataChild){
                    if(!listIdChilds.includes(item.ID)){
                        listIdChilds.push(item.ID)
                    }
                    FindChilds(item.DataChild)
                }else {
                    if(!listIdChilds.includes(item.ID)){
                        listIdChilds.push(item.ID)
                    }
                }
            })
        }
        const listArrFirstChild = [] 
        // loop for each item child
        for (let i = 0; i < getIdDataChilds.length; i++) {
            // Find item from original data based on data get from DOM
            const findChildsData = (list,idChild) => {
                list.forEach(item => {
                    if(item.DataChild){
                        if(Number(item.ID)  === Number(idChild)){
                           if(!listArrFirstChild.includes(Number(item))){
                             listArrFirstChild.push(item)
                           }
                        }else {
                            findChildsData(item.DataChild,idChild)
                        }
                    }else {
                        if(Number(item.ID)  === Number(idChild)){
                           if(!listArrFirstChild.includes(Number(item))){
                             listArrFirstChild.push(item)
                           }
                        }
                    }
                })
            }
            findChildsData(list,getIdDataChilds[i].getAttribute('id-child'))

            // Take item ID of each item listArrFirstChild
            FindChilds(listArrFirstChild)
            

            const listElementFromIdChilds = []
            // get all element child based on list ID child above
            listIdChilds.forEach(ID => {
                const getIdChildsEle = document.querySelectorAll(`[id-child="${ID}"]`)
                if(getIdChildsEle){
                    listElementFromIdChilds.push(...getIdChildsEle)
                }
            })      
            // loop for each item child to remove all attribute and hidden it
            listElementFromIdChilds.forEach(item => {
              const id = item.getAttribute('id-child')
              item.classList.remove(`active${id}`)
              item.setAttribute('data-id__parent',null)
              item.classList.add('disabled-rowItem')  
            })                                     
        }
    }

    const handleRenderChildActive = (item,list,rootTbody,listOrign) => {
        const activeParent = document.getElementsByClassName(`active${item.ParentID}`)
        const listTotalCHild = [...rootTbody.children]
        const  obj  = listTotalCHild.filter(itemFilter => Number(itemFilter.getAttribute('data-id')) === Number(item.ParentID))[0]
        let parent
        //  loop find item parent based on parentID
        findParentArray(listOrign,item.ParentID,parent)
        // const indexParent = docu
        let positionChildAt = parent?.DataChild?.indexOf(item) + 1
        // find position of child in parent
        if(activeParent.length){
            const ele = document.querySelectorAll(`[id-child="${item.ID}"]`)
            if(ele.length){
                const newArrConstainsEleHave = [...ele]
                Array.isArray(newArrConstainsEleHave)
                newArrConstainsEleHave.forEach(itemConstains => {
                    itemConstains.setAttribute('data-id__parent',item.ParentID)
                    itemConstains.classList.remove('disabled-rowItem')  
                })
            }else {
                const tr = document.createElement('tr')
                item.DataArr.forEach((itemData,indexData) => {  
                    const td = document.createElement('td')
                    td.id = itemData.ID
                    td.classList.add('item-rows')
                    let inputEdit 
                    if(!itemData?.isEdit){
                        inputEdit = document.createElement('p')
                        inputEdit.textContent = item.Content !== "0" ? item.Content : ''
                    }else {
                        inputEdit = document.createElement('input')
                        inputEdit.defaultValue =  itemData.Content !== "0" ? itemData.Content : '' 
                        inputEdit.disabled = !item?.isEdit
                        inputEdit.value = itemData.Content !== "0" ? itemData.Content : '' 
                    }
                    inputEdit.style.cssText = itemData?.Style
                    td.appendChild(inputEdit)
                    tr.appendChild(td)
                    // handle clicked in td is first child
                    if(indexData === 0){
                        td.onclick = () => {
                            if(item.DataChild){
                              tr.classList.toggle(`active${item.ID}`)
                                handleLoopListChidRows(item.DataChild,item,rootTbody,listOrign)
                            }
                        }
                    }
                })
                tr.setAttribute('id-child',item.ID)
                tr.setAttribute('data-id',item.ID)
                tr.setAttribute('data-id__parent',item.ParentID)
                const arr = [...rootTbody.children]
                Array.isArray(arr)
                if(parent && parent.ID){
                    const arrChildsTbody = [...rootTbody.children]
                    for (let i = 0; i < arrChildsTbody.length; i++) {
                       if(Number(arrChildsTbody[i].getAttribute('data-id')) === parent.ID){
                            positionChildAt += i 
                        
                       }
                        
                    }
                }
                rootTbody.insertBefore(tr, rootTbody.children[positionChildAt]);
            }
        }
    }

    const findParentArray = (list,ParentID,parent) => {
        list.forEach(item => {
            if(item.DataChild){
                if(item.ID === ParentID){
                    parent = item
                }else {
                    findParentArray(item.DataChild,ParentID)
                }
            }else {
                if(item.ID === ParentID){
                    parent = item
                }
            }
        })
    }

    const handleRenderActiveNotChild = (item,list,rootTbody,listOrign,activeParent) => {
        // select all item
        const ele = document.querySelectorAll(`[data-id="${item.ID}"]`)
        let parent
        // find parent of current item 
        findParentArray(listOrign,item.ParentID,parent)
        // find position of item in list child of parent
        let positionChildAt = parent?.DataChild?.indexOf(item) + 1
        if(activeParent.length){
            if(ele.length){
                const newArrConstainsEleHave = [...ele]
                Array.isArray(newArrConstainsEleHave)
                // loop all item and remove disabled 
                        newArrConstainsEleHave.forEach(itemConstains => {
                            itemConstains.setAttribute('data-id__parent',item.ParentID)
                            itemConstains.classList.remove('disabled-rowItem')  
                        })
            }else {
                // if DOM not have item, declare new item
                const tr = document.createElement('tr')
                item.DataArr.forEach(itemTD => {
                    // create id tag for each item in dataArr
                    const td = document.createElement('td')
                    // create inputEdit for each td
                    let inputEdit 
                    if(!itemTD?.isEdit){
                        inputEdit = document.createElement('p')
                        inputEdit.textContent = item.Content !== "0" ? item.Content : ''
                    }else {
                        inputEdit = document.createElement('input')
                        inputEdit.defaultValue = itemTD.Content  ? itemTD.Content  : ''
                        inputEdit.disabled = !itemTD.isEdit
                    }
                    inputEdit.style.cssText = itemTD?.Style
                    // push input to td
                    td.appendChild(inputEdit)
                    // push td to tr
                    tr.appendChild(td)
                })
                tr.setAttribute('id-child',item.ID)
                tr.setAttribute('data-id',item.ID)
                tr.setAttribute('data-id__parent',item.ParentID)
                // create arr is array constains all child of tbody
                const arr = [...rootTbody.children]
                Array.isArray(arr)
                if(parent && parent.ID){
                    const arrChildsTbody = [...rootTbody.children]
                    // loop for each child of array and find parent of current item
                    for (let i = 0; i < arrChildsTbody.length; i++) {
                       if(Number(arrChildsTbody[i].getAttribute('data-id')) === parent.ID){   
                            positionChildAt += i 
                       }   
                    }
                }
                // insert tr to rootTbody
                rootTbody.insertBefore(tr, rootTbody.children[positionChildAt]);
            }
        }
    }


    const handleLoopListChidRows = (list,itemParents,rootTbody,listOrign) => {
        list.forEach(item => {
                const activeParent = document.getElementsByClassName(`active${item.ParentID}`)
                if(!activeParent.length) {
                    // handle remove active item current and hidden child of current item
                    handleRemoveActiveCurrent(item,rootTbody,list)
                }else  if(item?.DataChild?.length > 0 && activeParent.length){
                    handleRenderChildActive(item,list,rootTbody,listOrign)
                }else if(!item?.DataChild && activeParent.length) {
                    handleRenderActiveNotChild(item,list,rootTbody,listOrign,activeParent,rootTbody)
                }
        })
  }

    const handleRenderRowsTable = (rootTbody,list,listOrign) => {
        list.forEach((itemRows) => {
          // create trProps for each item
          const trProps = {
            Name :  '',
            props : {
                className : '',
                children : []
            }
          }
          if(itemRows.DataArr){
              itemRows.DataArr.forEach((item,index) => {
                /// handle on each frist rows 
                  if(index === 0){
                    // create th props
                      const thProps = {
                            Name :  '',
                            props : {
                                className : '',
                                children : []
                            }
                      }
                    // create input props
                      let inputEditProps = {
                        Name :  '',
                        props : {
                                className : '',
                        }
                      }
                      if(!item?.isEdit){
                        inputEditProps.props.defaultValue = item.Content !== "0" ? item.Content : ''
                      }else {
                          inputEditProps.props.defaultValue = item.Content !== "0" ? item.Content : ''
                          inputEditProps.props.disabled = !item?.isEdit
                      }
                      // check item have edit or not to render html tag
                    //   inputEditProps.props.style = item?.Style
                      const inputEdit = React.createElement('input',{...inputEditProps.props})
                      // push input is children to html th tags
                      thProps.props.children.push(inputEdit)
                      thProps.props.id = item.ID
                      thProps.props.className += 'item-row'
                      thProps.props['data-id'] = itemRows.ID
                    //   tr.setAttribute('data-id',itemRows.ID)
                      const itemParent = list.filter(item => item.ID === itemRows.ID)
                      const listChild = itemParent[0]?.DataChild 
                      // handle click to show more child
                      const EventClickTH = () => {
                        const rootTbody = document.getElementById('rootTbody')
                        // find parent of current item
                        const findParent = list.filter(items => items.DataArr.includes(item))
                        // find parent tag from parent id
                        const findParentElement = document.querySelectorAll(`[data-id="${findParent[0].ID}"]`)[0];
                        findParentElement.classList.toggle(`active${findParent[0]?.ID}`)
                          /// toggle class active when item clicked and show children of item 
                        handleLoopListChidRows(listChild,tr,rootTbody,listOrign)
                      }
                      // assign event onClick to th
                      thProps.props.onClick = () => EventClickTH()
                      // decrale th
                      const th = React.createElement('td',{...thProps.props},[...thProps.props.children]) 
                      // push th tag to tr
                      trProps.props.children.push(th)
                  }else {
                    // create th props and set attribute for input
                    const propsTH = {
                            Name : '',
                            props : {
                                className : '',
                                children : []
                            }
                    }
                    // create input props and set attribute for input
                    let inputEditProps = {
                        Name : '',
                        props : {
                            className : '',
                        }
                    }
                    if(!item?.isEdit){
                        inputEditProps.props.defaultValue = item.Content !== "0" ? item.Content : ''
                    }else {
                        inputEditProps.props.defaultValue = item.Content !== "0" ? item.Content : ''
                        inputEditProps.props.disabled = !item.isEdit
                    }
                    // inputEditProps.props.style = item?.Style
                    propsTH.props.id = item.ID
                    // declare input from input props
                    const inputEdit = React.createElement('input',{...inputEditProps.props})
                    // push input is children to th
                    propsTH.props.children.push(inputEdit)
                    propsTH.props.className +='item-rows'
                    // declare th tag from th props
                    const th = React.createElement('td',{...propsTH.props},[...propsTH.props.children])
                    // push th tag to tr
                    trProps.props.children.push(th)
                  }
              })
          }
          trProps.props.className += 'trHover'
          // declare tr and push to tbody
          const tr = React.createElement('tr',{...trProps.props},[...trProps.props.children])
          rootTbody.props.children.push(tr)
        })
    }

      
    // const caculatorWidthEachRowsTable = tableData.length > 15 ? ` ${tableData.length * 30}px` : 'auto'
    return <PageWrapper >
            <div className="wrapper__table">
               {step === 1 ? <>
                <table>
                    {handleRenderHeaderTreeV2(tableHeader)}
                    {beforeHandleRenderHeaderRow()}
                </table>
               </> : <>
                Hello word
                <button onClick={() => setStep(1)}>Trở về</button>
               </>}
            </div>
    </PageWrapper>

}


export {Table}