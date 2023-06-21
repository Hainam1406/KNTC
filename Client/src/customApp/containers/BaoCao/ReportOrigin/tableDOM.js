import React, { useEffect, useState,useLayoutEffect,useRef } from 'react'
import PageWrapper from './table.styled'

const Table = ({tableHeader,tableData,ChiTietDonThu,setStep,step}) => {
    const [detailsTable,setDetailsTable] = useState({})
    const [showTable,setShowTable] = useState(false)
    const ref = useRef()



    useEffect(() => {
        if(ref.current ){
            // console.log
            ref.current.innerHTML = ""
            setShowTable(true)
        }
    },[ref,step])

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
                Cap+1
                findChilds.forEach(item => {
                    formatListTree(item.DataChild,Cap)
                })
            }
        })
    }   
    // formatListTree(fakeColumns)
    
    
    
    const handleRenderTree = (RootTable,list,itemParent) => {
        list.forEach(item => {
          if(item.DataChild){
            const tr = document.createElement('tr')
            const th = document.createElement('th')
            // handleGetColSpanEachTh(list,item)
            th.innerHTML = item.Name
            tr.appendChild(th)
            th.style.cssText = item?.Style
            // if(item?.style){
            //     for (const propertys in item.style) {
            //         th.style[propertys] = item?.style[propertys]
            //     }
            // }
            // th.id = item.id
            // tr.id = item.parent + itemParent?.id
            !item.DataChild ? th.rowSpan = 0 : null
            tr.id = itemParent?.Cap
            // const findGroupParent = document.getElementById(item.parent + itemParent?.id)
            const findGroupParent = document.getElementById(itemParent?.Cap)
            th.classList.add('parent__group')
            
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
            
            th.colSpan =  getItemColspan(list,item)  
            if(findGroupParent){
              let isContains = false
              const arrChilds = findGroupParent.children
              for (let i = 0; i < arrChilds.length; i++) {
                if(Number(arrChilds[i].id) === item.ID){
                  isContains = true
                }
              }
              if(!isContains){
                findGroupParent.appendChild(th)
              }
            }else {
              RootTable.appendChild(tr)
            }
            
            handleRenderTree(RootTable,item.DataChild,item)
            
          }else {
            const tr = document.createElement('tr')
            const th = document.createElement('th')
            th.innerHTML = item.Name
            th.style.cssText = item?.Style
            // th.id = item.id
            !item.DataChild ? th.rowSpan = 0 : null
            tr.appendChild(th)
            tr.id = itemParent?.Cap
            // const findGroupParent = document.getElementById(item.parent + itemParent?.id)
            const findGroupParent = document.getElementById(itemParent?.Cap)
            // tr.id = item.parent + itemParent?.id
            // const findGroupParent = document.getElementById(item.parent + itemParent?.id)
            if(findGroupParent ){
              let isContains = false
              const arrChilds = findGroupParent.children
              for (let i = 0; i < arrChilds.length; i++) {
                if(Number(arrChilds[i].id) === item.ID){
                  isContains = true
                }
              }
              if(!isContains){
                findGroupParent.appendChild(th)
              }
            }else {
              RootTable.appendChild(tr)
            }
          }
        })
    }
    //   handleRenderTree(fakeColumns)


    const beforeHandleRenderHeaderTree = () => {
        const thead = document.createElement('thead')
        // const thead2 = <thead></thead>
        // thead2.props.children =
        const findTable = document.querySelector('wrapper__table')
        const newTableHeader = [...tableHeader]
        formatListTree(newTableHeader)
        return  handleRenderHeaderTree(thead,newTableHeader)
    
    }

    const beforeHandleRenderHeaderRow = () => {
        const rootTbody = document.createElement('tbody')
        console.log(tableData,'tableData')
        return  handleRenderRowsTable(rootTbody,tableData)
    }

    const handleRenderHeaderTree = (RootTable,list,itemParent) => {
        // if(RootTable){}
        
        // RootTable = 
        list.map(item => {
            if(item.DataChild){
              const tr = document.createElement('tr')
              const th = document.createElement('th')
              // handleGetColSpanEachTh(list,item)
              th.innerHTML = item.Name
              tr.appendChild(th)
              th.style.cssText = item?.Style
              !item.DataChild ? th.rowSpan = 0 : null
              tr.id = itemParent?.Cap
              
              let findGroupParent 
              // get group parent of current item
              const getGroupParent = (list,Cap) => {
                const arr = [...list]
                Array.isArray(arr)
                arr.forEach(item => {
                    if(item.children.length > 0){
                        if(item.id === Cap?.toString()){
                            findGroupParent = item
                        }else {
                            getGroupParent(item.children,Cap?.toString())
                        }
                    }else {
                        if(item.id === Cap?.toString() ){
                            findGroupParent = item
                        }
                    }
                })
              }
              getGroupParent(RootTable.children,itemParent?.Cap ? itemParent?.Cap : 0)

              th.classList.add('parent__group')
              
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
              
              th.colSpan =  getItemColspan(list,item)  
              if(findGroupParent){
                let isContains = false
                const arrChilds = findGroupParent.children
                for (let i = 0; i < arrChilds.length; i++) {
                  if(Number(arrChilds[i].id) === item.ID){
                    isContains = true
                  }
                }
                // check if group parent not include item 
                if(!isContains){
                  findGroupParent.appendChild(th)
                }
              }else {
                // if not have group parent then push item to rootable
                RootTable.appendChild(tr)
              }
              
              handleRenderHeaderTree(RootTable,item.DataChild,item)
              
            }else {
              const tr = document.createElement('tr')
              const th = document.createElement('th')
              th.innerHTML = item.Name
              th.style.cssText = item?.Style
              !item.DataChild ? th.rowSpan = 0 : null
              tr.appendChild(th)
              tr.id = itemParent?.Cap ? itemParent?.Cap : 0
              let findGroupParent 
              // get group parent of current item
              const getGroupParent = (list,Cap) => {
                const arr = [...list]
                Array.isArray(arr)
                arr.forEach(item => {
                    if(item.children.length > 0){
                        if(item.id === Cap?.toString()){
                            findGroupParent = item
                        }else {
                            getGroupParent(item.children,Cap?.toString())
                        }
                    }else {
                        if(item.id === Cap?.toString() ){
                            findGroupParent = item
                        }
                    }
                })
              }
              getGroupParent(RootTable.children,itemParent?.Cap ? itemParent?.Cap : 0)


              if(findGroupParent ){
                let isContains = false
                const arrChilds = findGroupParent.children
                for (let i = 0; i < arrChilds.length; i++) {
                  if(Number(arrChilds[i].id) === item.ID){
                    isContains = true
                  }
                }
                if(!isContains){
                  findGroupParent.appendChild(th)
                }
              }else {
                RootTable.appendChild(tr)
              }
            }
          })
          if(ref.current?.children[0]){
            // if header table was exist so remove header table and add current header above
            ref.current.removeChild(ref.current.children[0])
            ref.current?.insertBefore(RootTable,ref.current.children[0])
          }else {
            // if header table not exist so add current header to table
            ref.current?.insertBefore(RootTable,ref.current.children[0])
          }
        //   return <thead dangerouslySetInnerHTML={{__html : RootTable.innerHTML}}></thead>
    }
    const handleRenderRowsTable = (tbody,list,listOrign) => {
        const rootTbody = tbody
        list.forEach((itemRows) => {
          const tr = document.createElement('tr')

      
          if(itemRows.DataArr){
              itemRows.DataArr.forEach((item,index) => {
                /// handle on each frist rows 
                  if(index === 0){
                      const th = document.createElement('th')
                      let inputEdit
                      if(!item?.isEdit){
                          inputEdit = document.createElement('p')
                          inputEdit.textContent = item.Content !== "0" ? item.Content : ''
                      }else {
                          inputEdit = document.createElement('input')
                          inputEdit.defaultValue = item.Content !== "0" ? item.Content : ''
                          inputEdit.disabled = !item?.isEdit
                      }
                      // check item have edit or not to render html tag
                      inputEdit.style.cssText = item?.Style
                      th.appendChild(inputEdit)
                      th.id = item.ID
                      th.classList.add('item-row')
                      tr.setAttribute('data-id',itemRows.ID)
                      const itemParent = list.filter(item => item.ID === itemRows.ID)
                      const listChild = itemParent[0]?.DataChild        
                      // handle click to show more child
                      th.onclick = (e) => {
                          const findParent = list.filter(items => items.DataArr.includes(item))
                          const findParentElement = document.querySelectorAll(`[data-id="${findParent[0].ID}"]`)[0];
                          findParentElement.classList.toggle(`active${findParent[0]?.ID}`)
                          /// toggle class active when item clicked 
                          const handleLoopListChidRows = (list,itemParents) => {
                              list.forEach(item => {
                                      const activeParent = document.getElementsByClassName(`active${item.ParentID}`)
                                      if(!activeParent.length) {
                                            // handle remove active 
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
                                          for (let i = 0; i < getIdDataChilds.length; i++) {
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
      
                                              FindChilds(listArrFirstChild)
                                              
  
                                              const listElementFromIdChilds = []
  
                                              listIdChilds.forEach(ID => {
                                                  const getIdChildsEle = document.querySelectorAll(`[id-child="${ID}"]`)
                                                  if(getIdChildsEle){
                                                      listElementFromIdChilds.push(...getIdChildsEle)
                                                  }
                                              })      
                                              listElementFromIdChilds.forEach(item => {

                                                  item.setAttribute('data-id__parent',null)
                                                  item.classList.add('disabled-rowItem')  
                                              })
                                              // listElementFromIdChilds.forEach(item => {
                                              // })
                                      
                                          }
                                      }else  if(item?.DataChild?.length > 0 && activeParent.length){
                                          const activeParent = document.getElementsByClassName(`active${item.ParentID}`)
                                          const listTotalCHild = [...rootTbody.children]
                                          const  obj  = listTotalCHild.filter(itemFilter => Number(itemFilter.getAttribute('data-id')) === Number(item.ParentID))[0]
                                          let parent
                                          //  loop find item parent based on parentID
                                          const findParentArray = (list,ParentID) => {
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
                                          findParentArray(listOrign,item.ParentID)
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
                                                      if(indexData === 0){
                                                          td.onclick = () => {
                                                              if(item.DataChild){
                                                                  tr.classList.toggle(`active${item.id}`)
                                                                  handleLoopListChidRows(item.DataChild,item)
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
                                      }else if(!item?.DataChild && activeParent.length) {
                                          const ele = document.querySelectorAll(`[data-id="${item.ID}"]`)
                                          let parent
                                          const findParentArray = (list,ParentID) => {
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
                                          findParentArray(listOrign,item.ParentID)
                                          let positionChildAt = parent?.DataChild?.indexOf(item) + 1
                                          if(activeParent.length){
                                              if(ele.length){
                                                  const newArrConstainsEleHave = [...ele]
                                                          Array.isArray(newArrConstainsEleHave)
                                                          newArrConstainsEleHave.forEach(itemConstains => {
                                                              itemConstains.setAttribute('data-id__parent',item.ParentID)
                                                              itemConstains.classList.remove('disabled-rowItem')  
                                                          })
                                              }else {
                                                  const tr = document.createElement('tr')
                                                  item.DataArr.forEach(itemTD => {
                                                      const td = document.createElement('td')
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
                                                      // if(itemTD?.style){
                                                      //     for (const propertys in itemTD.style) {
                                                      //         td.style[propertys] = itemTD.style[propertys]
                                                      //     }
                                                      // }
                                                      td.appendChild(inputEdit)
                                                      tr.appendChild(td)
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
                                                  rootTbody.insertBefore(tr, rootTbody.children[positionChildAt ]);
                                              }
                                          }
                                      }
                                  // }else {
                                      
                                  // }
                              })
                          }
                          // if(listChild.length
                          handleLoopListChidRows(listChild,tr)
  
                      }
                      tr.appendChild(th)
                  }else {
                      const th = document.createElement('th')
                      let inputEdit 
                      if(!item?.isEdit){
                          inputEdit = document.createElement('p')
                          inputEdit.textContent = item.Content !== "0" ? item.Content : ''
                      }else {
                          inputEdit = document.createElement('input')
                          inputEdit.defaultValue =  item.Content !== "0" ? item.Content : ''
                          inputEdit.value =  item.Content  !== "0" ? item.Content : ''
                          inputEdit.disabled = !item.isEdit
                      }
                      inputEdit.style.cssText = item?.Style
                      th.id = item.ID
                      th.appendChild(inputEdit)
                      th.classList.add('item-rows')
                      th.addEventListener('click',e => {
                        setStep(2)
                        ChiTietDonThu(item?.CapID,item?.ID,item?.CoQuanID)
                      })
                      tr.appendChild(th)
                  }
              })
          }
        
          tr.classList.add('trHover')
          rootTbody.appendChild(tr)
        })
        
        
        if(ref.current?.children[1]){
          ref.current.removeChild(ref.current.children[1])
          ref.current.insertBefore(rootTbody,ref.current.children[1])
        }else {
          ref.current?.insertBefore(rootTbody,ref.current.children[1])
        }
    }
    
    // const handleRenderRows = (list,listOrign) => {
    //       list.forEach((itemRows) => {
    //         const tr = document.createElement('tr')

        
    //         if(itemRows.DataArr){
    //             itemRows.DataArr.forEach((item,index) => {
    //                 if(index === 0){
    //                     const th = document.createElement('th')
    //                     let inputEdit = document.createElement('input')
    //                     if(!item?.isEdit){
    //                         inputEdit = document.createElement('p')
    //                         inputEdit.textContent = item.Content !== "0" ? item.Content : ''
    //                     }else {
    //                         inputEdit = document.createElement('input')
    //                         inputEdit.defaultValue = item.Content !== "0" ? item.Content : ''
    //                         inputEdit.disabled = !item?.isEdit
    //                     }
    //                     inputEdit.style.cssText = item?.Style
    //                     th.appendChild(inputEdit)
    //                     th.id = item.ID
    //                     th.classList.add('item-row')
    //                     tr.setAttribute('data-id',itemRows.ID)
    //                     const itemParent = list.filter(item => item.ID === itemRows.ID)
    //                     // const rootCurrentParent = document.getElementById(itemRows.ID)
    //                     const rootTbody = document.getElementById('rootTbody')
    //                     // const index = dataRows.indexOf(itemParent[0])
    //                     // const rooTable = document.getElementById('my-table')
    //                     const listChild = itemParent[0]?.DataChild        
                        
                        
    //                     // handleRenderRows(itemRows.dataChild)
                        
    //                     th.onclick = (e) => {
    //                         const findParent = list.filter(items => items.DataArr.includes(item))
    //                         const findParentElement = document.querySelectorAll(`[data-id="${findParent[0].ID}"]`)[0];
    //                         findParentElement.classList.toggle(`active${findParent[0]?.ID}`)
    //                         const handleLoopListChidRows = (list,itemParents) => {
    //                             list.forEach(item => {
    //                                     const activeParent = document.getElementsByClassName(`active${item.ParentID}`)
    //                                     if(!activeParent.length) {
    //                                         const getIdDataChilds = document.querySelectorAll(`[data-id__parent="${item.ParentID}"]`);
    //                                         const listTotalCHild = [...rootTbody.children]
    //                                         Array.isArray(listTotalCHild)
    //                                         const listIdChilds = []
    //                                         const FindChilds = list  => {
    //                                             list.forEach(item => {
    //                                                 if(item.DataChild){
    //                                                     if(!listIdChilds.includes(item.ID)){
    //                                                         listIdChilds.push(item.ID)
    //                                                     }
    //                                                     FindChilds(item.DataChild)
    //                                                 }else {
    //                                                     if(!listIdChilds.includes(item.ID)){
    //                                                         listIdChilds.push(item.ID)
    //                                                     }
    //                                                 }
    //                                             })
    //                                         }
    //                                         const listArrFirstChild = [] 
    //                                         for (let i = 0; i < getIdDataChilds.length; i++) {
    //                                             const findChildsData = (list,idChild) => {
    //                                                 list.forEach(item => {
    //                                                     if(item.DataChild){
    //                                                         if(Number(item.ID)  === Number(idChild)){
    //                                                            if(!listArrFirstChild.includes(Number(item))){
    //                                                              listArrFirstChild.push(item)
    //                                                            }
    //                                                         }else {
    //                                                             findChildsData(item.DataChild,idChild)
    //                                                         }
    //                                                     }else {
    //                                                         if(Number(item.ID)  === Number(idChild)){
    //                                                            if(!listArrFirstChild.includes(Number(item))){
    //                                                              listArrFirstChild.push(item)
    //                                                            }
    //                                                         }
    //                                                     }
    //                                                 })
    //                                             }
    //                                             findChildsData(list,getIdDataChilds[i].getAttribute('id-child'))
        
    //                                             FindChilds(listArrFirstChild)
                                                
    
    //                                             const listElementFromIdChilds = []
    
    //                                             listIdChilds.forEach(ID => {
    //                                                 const getIdChildsEle = document.querySelectorAll(`[id-child="${ID}"]`)
    //                                                 if(getIdChildsEle){
    //                                                     listElementFromIdChilds.push(...getIdChildsEle)
    //                                                 }
    //                                             })      
    //                                             listElementFromIdChilds.forEach(item => {

    //                                                 item.setAttribute('data-id__parent',null)
    //                                                 item.classList.add('disabled-rowItem')  
    //                                             })
    //                                             // listElementFromIdChilds.forEach(item => {
    //                                             // })
                                        
    //                                         }
    //                                     }else  if(item?.DataChild?.length > 0 && activeParent.length){
    //                                         const activeParent = document.getElementsByClassName(`active${item.ParentID}`)
    //                                         const listTotalCHild = [...rootTbody.children]
    //                                         const  obj  = listTotalCHild.filter(itemFilter => Number(itemFilter.getAttribute('data-id')) === Number(item.ParentID))[0]
    //                                         let parent
    //                                         const findParentArray = (list,ParentID) => {
    //                                             list.forEach(item => {
    //                                                 if(item.DataChild){
    //                                                     if(item.ID === ParentID){
    //                                                         parent = item
    //                                                     }else {
    //                                                         findParentArray(item.DataChild,ParentID)
    //                                                     }
    //                                                 }else {
    //                                                     if(item.ID === ParentID){
    //                                                         parent = item
    //                                                     }
    //                                                 }
    //                                             })
    //                                         }
    //                                         findParentArray(listOrign,item.ParentID)
    //                                         // const indexParent = docu
    //                                         let positionChildAt = parent?.DataChild?.indexOf(item) + 1

    //                                         if(activeParent.length){
    //                                             const ele = document.querySelectorAll(`[id-child="${item.ID}"]`)
    //                                             if(ele.length){
    //                                                 const newArrConstainsEleHave = [...ele]
    //                                                 Array.isArray(newArrConstainsEleHave)
    //                                                 newArrConstainsEleHave.forEach(itemConstains => {
    //                                                     itemConstains.setAttribute('data-id__parent',item.ParentID)
    //                                                     itemConstains.classList.remove('disabled-rowItem')  
    //                                                 })
    //                                             }else {
    //                                                 const tr = document.createElement('tr')
    //                                                 item.DataArr.forEach((itemData,indexData) => {  
    //                                                     const td = document.createElement('td')
    //                                                     td.id = itemData.ID
    //                                                     td.classList.add('item-rows')
    //                                                     // if(itemData?.style){
    //                                                     //     for (const propertys in itemData.style) {
    //                                                     //         td.style[propertys] = itemData.style[propertys]
    //                                                     //     }
    //                                                     // }
    //                                                     let inputEdit 
    //                                                     if(!itemData?.isEdit){
    //                                                         inputEdit = document.createElement('p')
    //                                                         inputEdit.textContent = item.Content !== "0" ? item.Content : ''
    //                                                     }else {
    //                                                         inputEdit = document.createElement('input')
    //                                                         inputEdit.defaultValue =  itemData.Content !== "0" ? itemData.Content : '' 
    //                                                         inputEdit.disabled = !item?.isEdit
    //                                                         inputEdit.value = itemData.Content !== "0" ? itemData.Content : '' 
    //                                                     }
    //                                                     inputEdit.style.cssText = itemData?.Style
    //                                                     td.appendChild(inputEdit)
    //                                                     tr.appendChild(td)
    //                                                     if(indexData === 0){
    //                                                         td.onclick = () => {
    //                                                             if(item.DataChild){
    //                                                                 tr.classList.toggle(`active${item.id}`)
    //                                                                 handleLoopListChidRows(item.DataChild,item)
    //                                                             }
    //                                                         }
    //                                                     }
    //                                                 })
    //                                                 tr.setAttribute('id-child',item.ID)
    //                                                 tr.setAttribute('data-id',item.ID)
    //                                                 tr.setAttribute('data-id__parent',item.ParentID)
    //                                                 const arr = [...rootTbody.children]
    //                                                 Array.isArray(arr)
    //                                                 if(parent && parent.ID){
    //                                                     const arrChildsTbody = [...rootTbody.children]
    //                                                     for (let i = 0; i < arrChildsTbody.length; i++) {
    //                                                        if(Number(arrChildsTbody[i].getAttribute('data-id')) === parent.ID){
    //                                                             positionChildAt += i 
                                                            
    //                                                        }
                                                            
    //                                                     }
    //                                                 }
    //                                                 rootTbody.insertBefore(tr, rootTbody.children[positionChildAt]);
    //                                             }
    //                                         }
    //                                     }else if(!item?.DataChild && activeParent.length) {

    //                                         const ele = document.querySelectorAll(`[data-id="${item.ID}"]`)
    //                                         let parent
    //                                         const findParentArray = (list,ParentID) => {
    //                                             list.forEach(item => {
    //                                                 if(item.DataChild){
    //                                                     if(item.ID === ParentID){
    //                                                         parent = item
    //                                                     }else {
    //                                                         findParentArray(item.DataChild,ParentID)
    //                                                     }
    //                                                 }else {
    //                                                     if(item.ID === ParentID){
    //                                                         parent = item
    //                                                     }
    //                                                 }
    //                                             })
    //                                         }
    //                                         findParentArray(listOrign,item.ParentID)
    //                                         let positionChildAt = parent?.DataChild?.indexOf(item) + 1
    //                                         if(activeParent.length){
    //                                             if(ele.length){
    //                                                 const newArrConstainsEleHave = [...ele]
    //                                                         Array.isArray(newArrConstainsEleHave)
    //                                                         newArrConstainsEleHave.forEach(itemConstains => {
    //                                                             itemConstains.setAttribute('data-id__parent',item.ParentID)
    //                                                             itemConstains.classList.remove('disabled-rowItem')  
    //                                                         })
    //                                             }else {
    //                                                 const tr = document.createElement('tr')
    //                                                 item.DataArr.forEach(itemTD => {
    //                                                     const td = document.createElement('td')
    //                                                     let inputEdit 
    //                                                     if(!itemTD?.isEdit){
    //                                                         inputEdit = document.createElement('p')
    //                                                         inputEdit.textContent = item.Content !== "0" ? item.Content : ''
    //                                                     }else {
    //                                                         inputEdit = document.createElement('input')
    //                                                         inputEdit.defaultValue = itemTD.Content  ? itemTD.Content  : ''
    //                                                         inputEdit.disabled = !itemTD.isEdit
    //                                                     }
    //                                                     inputEdit.style.cssText = itemTD?.Style
    //                                                     // if(itemTD?.style){
    //                                                     //     for (const propertys in itemTD.style) {
    //                                                     //         td.style[propertys] = itemTD.style[propertys]
    //                                                     //     }
    //                                                     // }
    //                                                     td.appendChild(inputEdit)
    //                                                     tr.appendChild(td)
    //                                                 })
    //                                                 tr.setAttribute('id-child',item.ID)
    //                                                 tr.setAttribute('data-id',item.ID)
    //                                                 tr.setAttribute('data-id__parent',item.ParentID)
    //                                                 const arr = [...rootTbody.children]
    //                                                 Array.isArray(arr)
    //                                                 if(parent && parent.ID){
    //                                                     const arrChildsTbody = [...rootTbody.children]
    //                                                     for (let i = 0; i < arrChildsTbody.length; i++) {
    //                                                        if(Number(arrChildsTbody[i].getAttribute('data-id')) === parent.ID){
                                                            
    //                                                             positionChildAt += i 
                                                            
    //                                                        }
                                                            
    //                                                     }
    //                                                 }
    //                                                 rootTbody.insertBefore(tr, rootTbody.children[positionChildAt ]);
    //                                             }
    //                                         }
    //                                     }
    //                                 // }else {
                                        
    //                                 // }
    //                             })
    //                         }
    //                         // if(listChild.length
    //                         handleLoopListChidRows(listChild,tr)
    
    //                     }
    //                     tr.appendChild(th)
    //                 }else {
    //                     const th = document.createElement('th')
    //                     let inputEdit 
    //                     if(!item?.isEdit){
    //                         inputEdit = document.createElement('p')
    //                         inputEdit.textContent = item.Content !== "0" ? item.Content : ''
    //                     }else {
    //                         inputEdit = document.createElement('input')
    //                         inputEdit.defaultValue =  item.Content !== "0" ? item.Content : ''
    //                         inputEdit.value =  item.Content  !== "0" ? item.Content : ''
    //                         inputEdit.disabled = !item.isEdit
    //                     }
    //                     inputEdit.style.cssText = item?.Style
    //                     th.id = item.ID
    //                     th.appendChild(inputEdit)
    //                     th.classList.add('item-rows')
    //                     tr.appendChild(th)
    //                     // if(item?.style){
    //                     //     for (const propertys in item.style) {
    //                     //         th.style[propertys] = item.style[propertys]
    //                     //     }
    //                     // }
    //                 }
    //             })
    //         }
    //         tr.addEventListener('click',e => handleClickEachTR(tr.getAttribute('data-id')))
    //         tr.classList.add('trHover')
    //         rootTbody.appendChild(tr)
    //     })
    // }
    // //   handleRenderRows(dataRows)

    const handleClickEachTR = (id) => {
        setStep(2)
    }
    
      
    // const caculatorWidthEachRowsTable = tableData.length > 15 ? ` ${tableData.length * 30}px` : 'auto'
    return <PageWrapper >
            <div className="wrapper__table">
               {step === 1 ? <>
                <table id = "my-table">
                    <div ref = {ref} className='wrapper-all__table' id = "wrapper-all__table">
                        {showTable ? beforeHandleRenderHeaderTree() : null}
                        {showTable ?  beforeHandleRenderHeaderRow() : null}
                    </div>
                </table>
               </> : <>
                Hello word
                <button onClick={() => setStep(1)}>Trở về</button>
               </>}
            </div>
    </PageWrapper>

}


export {Table}