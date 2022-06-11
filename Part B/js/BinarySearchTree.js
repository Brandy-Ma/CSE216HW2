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
        if(initNode.key < initKey)
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
        else if(initNode.key < initKey)
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

    }

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