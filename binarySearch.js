class Node{
    constructor(value, left=null,right=null){
        this.value = value
        this.left = left
        this.right = right
    }
}

class Tree{
    constructor(array){
        let arr_sorted = this.removeDuplicates(array)
        arr_sorted.sort(function(a, b){return a - b})
        this.root = this.buildTree(arr_sorted, 0, arr_sorted.length-1)
    }

    buildTree(arr,start,end){
       if(start>end){return null;}
       let mid = Math.floor((start + end)/2); console.log(`start:${start}  mid : ${mid}  end: ${end}`)
       let root = new Node(arr[mid])
       root.left = this.buildTree(arr,start,mid-1);
       root.right = this.buildTree(arr,mid+1,end)
       return root
    }

    removeDuplicates(arr) {
        let unique = [];
        arr.every(element => {
            if (!unique.includes(element)) {
                unique.push(element);
            }
            return true; 
        });
        return unique;
    }

    insert(val){this.root = this.insertRec(this.root,val)}
    delete(val){this.root = this.deleteRec(this.root,val)}

    insertRec(root,val){
        if(root==null){
            root = new Node(val)
            return root;
        }
        if(val<root.value){
            root.left = this.insertRec(root.left,val)
        }
        if(val>root.value){
            root.right = this.insertRec(root.right,val)
        }

        return root;
    }

    deleteRec(root, val){
        if(root===null){
            return root;
        }
        if(val<root.value){
            root.left = this.deleteRec(root.left,val)
        }
        else if(val>root.value){
            root.right = this.deleteRec(root.right,val)
        }
        else{
            if(root.left==null){
                return root.right
            }
            else if(root.right===null){
                return root.left
            }
            root.value = this.minValue(root.right)
            root.right = this.deleteRec(root.right,root.key)
        }
        return root;
    }

    minValue(node){
        let minv = node.value
        while(node.left !== null){
            minv = node.left.value
            node = node.length
        }
        return minv
    }

    find(val,node=this.root){
        if(node===null){
            return null;
        }
        if(node.value===val){
            return node;
        }
        let left = this.find(val,node.left)
        let right = this.find(val,node.right)
        if(left){
            return left;
        }
            return right;
    }

    levelOrder(callback,root=this.root, array = []){
        if(root===null)return;
        let queue = []
        queue.push(root)
        while(queue.length>0){
            let current = queue.shift();
            if(callback){
            callback(current)}
            else{
                array.push(current)
            }

            if(current.left!==null){
                queue.push(current.left)
            }

            if(current.right!==null){
                queue.push(current.right)
            }
        }

        if(!callback) return array

    }

    preOrder(callback,root=this.root, array =[]){
        if(!root){
            return null;
        }
        if(callback){callback(root)}

        else{
            array.push(root.value)
        }
        this.preOrder(callback, root.left, array)
        this.preOrder(callback, root.right, array)
        if(!callback){return array}
        
    }

    inOrder(callback,root=this.root, array =[]){
        if(!root){
            return null;
        }

        this.inOrder(callback, root.left, array)
        if(callback){callback(root)}

        else{
            array.push(root.value)
        }
        this.inOrder(callback, root.right, array)
        if(!callback){return array}
        
    }

    postOrder(callback,root=this.root, array =[]){
        if(!root){
            return null;
        }

        this.postOrder(callback, root.left, array)
        this.postOrder(callback, root.right, array)
        if(callback){callback(root)}

        else{
            array.push(root.value)
        }
        if(!callback){return array}
        
    }

    height(root=this.root) {
        if (root == null)
            return 0;
        else {
            let lheight = this.height(root.left);
            let rheight = this.height(root.right);

            if (lheight > rheight)
                return (lheight + 1);
            else
                return (rheight + 1);
        }
    }

    depth(node, root=this.root, depth=0){
        if(root==null){
            return null;
        }
        if(node===root){
            return depth
        }
        if(node.value>root.value){
            return this.depth(node,root.right,depth++)
        }
        if(node.value<root.value){
            return this.depth(node,root.left,depth++)
        }
    }

    isBalanced(root = this.root){
        if(root ==null){return true}
        let lh = this.height(root.left)
        let rh = this.height(root.right)

        let left = this.isBalanced(root.left)
        let right = this.isBalanced(root.right)
        if(Math.abs(lh-rh)<=1 && left &&right){
            return true
        }
        return false;
    }

    rebalance(root = this.root){
        if(!this.isBalanced(root)){
            let arr = this.inOrder()
            let node = this.buildTree(arr ,0 , arr.length-1)
            this.root = node
        }
    }
    
}



const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

//const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
 const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 99, 2])
 tree.insert(100)
 tree.insert(1000)
 tree.insert(200)
 prettyPrint(tree.root)
 console.log(tree.isBalanced())
//prettyPrint(tree.buildTree(tree.inOrder()))
tree.rebalance()
prettyPrint(tree.root)
console.log(tree.isBalanced())
//tree.insert(22)
//tree.delete(67)
// prettyPrint(tree.root)
//const left = tree.find(3)
//prettyPrint(left)

//tree.levelOrder((node)=>console.log(node.value))

//console.log(tree.inOrder())
//tree.preOrder((node)=>console.log(node.value))
//tree.postOrder((node)=>console.log(node.value))

//console.log(tree.height(tree.root.left));