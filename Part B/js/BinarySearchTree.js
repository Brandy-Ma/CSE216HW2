class Node {
    constructor(initKey, initData, initLeft, initRight) {
        this.key = initKey;
        this.data = initData;
        //this.parent = initParent;
        this.left = initLeft;
        this.right = initRight;
    }
};

export default class BinarySearchTree {
    constructor(initKeyLength) {
        this.root = null;
        this.size = 0;
        this.keyLength = initKeyLength;
    }

    // @todo - YOU MUST UPDATE THIS METHOD SO A KEY ONLY HAS LOWERCASE LETTERS, NO NUMBERS
    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 26);
            let randomChar;
            randomChar = String.fromCharCode(97+ randomNum);
            key += randomChar;
        }
        // console.log(key);
        return key;
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, value) {
        //add node if the root is empty
        if(this.root == null)
        {
            this.root = new Node(key, value, null, null);
            this.size = this.size + 1;
            return;
        }
        else
        {
            this.root = this.putValueHelper(key, value, this.root);
        }

    }
    //putvalueHelper
    putValueHelper(initKey, initData, initNode)
    {
        //if it is a leaf
        if(initNode == null)
        {
            this.size = this.size + 1;
            initNode = new Node(initKey, initData, null, null);
            return initNode;
        }
        //if found replace 
        if(initNode.key == initKey)
        {
            initNode.data = initData;
            return initNode;
        }
        //if key is smaller go left
        if(initKey < initNode.key)
        {
            initNode.left = this.putValueHelper(initKey, initData, initNode.left);
        }
        //else key is bigger go right
        else
        {
            initNode.right = this.putValueHelper(initKey, initData, initNode.right);
        }
        return initNode;

    }

    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        //if the root isn't initalized stop
        if(this.root == null)
        {
            return null;
        }
        else
        {
            return this.getValueHelper(key, this.root);
        }
        return null;
    }

    getValueHelper(initKey, initNode)
    {
        //if node doesn't exist stop
        if(initNode == null)
        {
            return null;
        }
        //if node key is equal
        else if(initNode.key == initKey)
        {
            return initNode.data;
        }
        //if node key is smaller
        else if(initKey < initNode.key )
        {
            return this.getValueHelper(initKey, initNode.left);
        }
        //else the key is bigger
        else
        {
            return this.getValueHelper(initKey, initNode.right);
        }
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {
        //if you cant get the node stop
        if(this.getValue(key) == null)
        {
            return;
        }
        this.root = this.removeHelper(key, this.root);
        this.size = this.size - 1;

    }

    removeHelper(key, initNode)
    {
        //if node is null(base case)
        if(initNode == null)
        {
            return initNode;
        }
        //check if the key is this node
        if(key == initNode.key)
        {
            //check if it has no children
            if(initNode.left == null && initNode.right == null)
            {
                return null;
            }
            //check if it has 1 child
            else if(initNode.left == null)
            {
                return initNode.right;
            }
            else if(initNode.right == null)
            {
                return initNode.left;
            }
            else
            {
            //find the largst on the left
            let tempRemovenode = this.findMinNode(initNode.right);
            initNode.data = tempRemovenode.data;
            initNode.key = tempRemovenode.key; 
            initNode.right = this.removeHelper(tempRemovenode.key, initNode.right);
            return initNode;   
            }
        }
        // //check left 
        else if(key < initNode.key )
        {
            initNode.left = this.removeHelper(key, initNode.left);
            return initNode;
        }
        // //check right
        else if(key > initNode.key  )
        {
            initNode.right = this.removeHelper(key, initNode.right);
            return initNode;
        }
        // //if it passes this then the node is the key
        // //check whether the node has a single child
        // if(initNode.left == null)
        // {
        //     return initNode.right;
        // }
        // else if(initNode.right == null)
        // {
        //     return initNode.left;
        // }
        // //if passes all thes cases the node has no children
        // else
        // {
        //     let tempNodeParent = initNode;
        //     if(initNode.left == null)
        //     {
        //         tempNodeParent = initNode.right;
        //     }
        //     else if(initNode.right == null)
        //     {
        //         tempNodeParent = initNode.left;
        //     }
        //     else
        //     {
        //         // //find the largst on the left
        //         // let tempRemovenode = this.findMaxNode(initNode.left)
        //         // tempNodeParent.data = tempRemovenode.data;
        //         // tempNodeParent.key = tempRemovenode.key; 
        //         // initNode.left = this.removeNodeSecond(initNode.left, tempRemovenode.key);
        //     }
        //     return tempNodeParent;
        // }
    }
    findMinNode(initNode)
    {
        let tempNode = initNode;
        while(tempNode.left != null)
        {
            tempNode = tempNode.left;
        }
        return tempNode;
    }
    // removeNodeSecond(initNode, initKey)
    // {
    //     return this.removeHelper(initNode, initKey);
    // }

    toStringRecursively(traveller, level) {
        let text = "";
        if (traveller.left != null)
            text += this.toStringRecursively(traveller.left, level+1);
        for (let i = 0; i < level; i++) {
            text += "   ";
        }
        text += "   " + traveller.data.toString() + "\n";
        if (traveller.right != null)
            text += this.toStringRecursively(traveller.right, level+1);
        return text;        
    }

    toString() {
        return this.toStringRecursively(this.root, 0);
    }
}