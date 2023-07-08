export class Element {
	constructor({ className, id, attribute, attValue, content }) {
		this.className = className;
		this.id = id;
		this.attribute = attribute;
		this.attValue = attValue;
		this.content = content;
	}

	create() {
		const block = document.createElement(this.tag);
		if (this.className) {
			block.classList.add(this.className);
		}
		if (this.id) {
			block.setAttribute("id", this.id);
		}
		if (this.attribute) {
			block.setAttribute(this.attribute, this.attValue);
		}
		return block;
	}
}

export class ElementWithEvent extends Element {
	constructor({ className, id, attribute, attValue, content, event, callback }) {
		super({ className, id, attribute, attValue, content });
		this.event = event;
		this.callback = callback;
	}

	addEventListener(node) {
		node.addEventListener(this.event, this.callback);
	}

	create() {
		const node = super.create();
		if (this.event) {
			this.addEventListener(node);
		}
		return node;
	}
}

export class Div extends Element {
	constructor({ className, id, attribute, attValue, content }) {
		super({ className, id, attribute, attValue, content });
		this.tag = "div";
	}
}

export class Span extends Element {
	constructor({ className, id, attribute, attValue, content }) {
		super({ className, id, attribute, attValue, content });
		this.tag = "span";
	}

	create() {
		const span = super.create();
		span.append(this.content);
		return span;
	}
}

export class Paragraph extends Element {
	constructor({ className, id, attribute, attValue, content }) {
		super({ className, id, attribute, attValue, content });
		this.tag = "p";
	}
}

export class Image extends Element {
	constructor({ className, id, attribute, attValue, content }) {
		super({ className, id, attribute, attValue, content });
		this.tag = "img";
	}
}

export class Form extends ElementWithEvent {
	constructor({ className, id, attribute, attValue, content, event, callback }) {
		super({ className, id, attribute, attValue, content, event, callback });
		this.tag = "form";
	}
}

export class Button extends ElementWithEvent {
	constructor({ className, id, attribute, attValue, content, event, callback }) {
		super({ className, id, attribute, attValue, content, event, callback });
		this.tag = "button";
	}
}

export class Input extends ElementWithEvent {
	constructor({ className, id, attribute, attValue, content, event, callback }) {
		super({ className, id, attribute, attValue, content, event, callback });
		this.tag = "input";
	}
}

export class Label extends Element {
	constructor({ className, id, attribute, attValue, content }) {
		super({ className, id, attribute, attValue, content });
		this.tag = "label";
	}
}

export function render(domTree, root) {
	for (let i = 0; i < domTree.length; i += 1) {
		if (!domTree[i].content) {
			root.append(domTree[i].create());
			continue;
		}
		const node = root.appendChild(domTree[i].create());
		if (!Array.isArray(domTree[i].content)) {
			node.textContent = domTree[i].content;
			continue;
		}
		render(domTree[i].content, node);
	}
}
