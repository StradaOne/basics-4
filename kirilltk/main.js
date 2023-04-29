const form = document.querySelector('#addTask');
const input = document.querySelector('#taskName');
const input2 = document.querySelector('#taskName2');

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const highPriorityTask = document.querySelector('#high-priority #tasks');
        const taskName = input.value;
        input.value = '';

        const newTask = document.createElement('div');
        newTask.setAttribute('id', 'task');
        newTask.innerHTML = `
        <form action="">
			<label>
				<input type="checkbox">
                <span class="checkmark"></span>
				<p>
					${taskName}
				</p>
			</label>
			<button id="deleteButton">x</button>
		</form>
        `;

        highPriorityTask.appendChild(newTask);
    }
});

input2.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const lowPriorityTask = document.querySelector('#low-priority #tasks');
        const taskName = input2.value;
        input2.value = '';

        const newTask = document.createElement('div');
        newTask.setAttribute('id', 'task');
        newTask.innerHTML = `
        <form action="">
			<label>
				<input type="checkbox">
                <span class="checkmark"></span>
				<p>
					${taskName}
				</p>
			</label>
			<button id="deleteButton">x</button>
		</form>
        `;

        lowPriorityTask.appendChild(newTask);
    }
});