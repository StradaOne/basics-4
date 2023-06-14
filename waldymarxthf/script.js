// render([new Div({
//   content: [
//     new Span({content: 'Hello'})
//   ],
// }), new Paragraph({ content: 'Test' })]);

const root = document.querySelector('#root')
class Element {
	constructor({className, id, content}) {
		this.className = className;
		this.id = id;
		this.content = content;
	}
	create() {
		let block = document.createElement(this.tag)
		if (this.className) {
			block.classList.add(this.className)
		}
		if (this.id) {
			block.setAttribute('id', this.id)
		}
		return block
	}
}

class Div extends Element {
	constructor({className, id, content}) {
		super({className, id, content})
		this.tag = 'div';
	}
}

function Div2({className, id, content}) {
	return 
}
class Span extends Element {
	constructor({className, id, content}) {
		super({className, id, content})
		this.tag = 'span';
	}
	create() {
		const span = super.create()
		span.append(this.content)
		return span
	}
}

class Paragraph extends Element {
	constructor({className, id, content}) {
		super({className, id, content})
		this.tag = 'p';
	}
}

domTree = [
  new Div({className: 'test_div', content: [
    new Paragraph({content: [
			new Span({
				content: 'hell'
			}),
			new Span({
				content: 'o'
			})
		]}),
    new Paragraph({content: 'World'}),
  ]}),
  new Div({className: 'test_div_2', content: '!!!'})
]
// console.log(domTree)

function render(domTree, root) {

	let stack = []
	domTree.forEach(el => {
		stack.unshift(el)
	})
	let rootNode = root
	while (stack.length) {
		let node = stack.pop()
		if (Array.isArray(node.content)) {
			stack.push(...(node.content).reverse())
			rootNode = rootNode.appendChild(node.create())
		} else {
			console.log(node.content)
			rootNode.append(node.create())
		}
		
		console.log(node)
	}
	// console.log(domTree)
	console.log(stack)
}

// function createElement(className, id, content) {
	
// }

render(domTree, root)