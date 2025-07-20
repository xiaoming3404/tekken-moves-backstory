function loadData(name) {
    const uri = name + '.csv';

    Papa.parse(uri, {
	download: true,
	header: true,
	skipEmptyLines: true,
	dynamicTyping: false,
	complete: function(results) {
	    renderTable(results.data);
	},
	error: function(err) {
	    document.getElementById('table-container').innerHTML =
		`<p style="color:red;">Error: ${err.message}</p>`;
	}
    });
}

function renderTable(data) {
    if (!Array.isArray(data) || data.length === 0) return;

    const keys = Object.keys(data[0]);
    const table = document.createElement('table');

    // Header
    const thead = table.createTHead();
    const headRow = thead.insertRow();
    keys.forEach(key => {
	const th = document.createElement('th');
	th.textContent = key;
	headRow.appendChild(th);
    });

    // Body
    const tbody = table.createTBody();
    data.forEach(item => {
	const row = tbody.insertRow();
	keys.forEach(key => {
	    const cell = row.insertCell();
	    cell.textContent = item[key];
	});
    });

    const container = document.getElementById('table-container');
    container.innerHTML = '';  // clear previous table
    container.appendChild(table);
}
