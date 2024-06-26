const Preloader = (resource) => {
    if (!Array.isArray(resource)) {
        console.error(`请传入一个资源列表`)
        return
    }
    let loaderArr = []
    if (Array.isArray(resource[0])) {
        resource.forEach(item => {
            const onComplete = item[2] ? item[2] : null
            const loaderItem = {
                name: item[0], // 资源的别名
                url: item[1], // 资源的地址
                onComplete // 资源完成加载时要调用的函数
            }
            loaderArr.push(loaderItem)
        })
    } else {
        loaderArr = resource
    }
    return new Promise((resolve, reject) => {
        Loader.add(loaderArr)
            .load(resolve)
        Loader.onError.add(reject)
    })
}
