document.addEventListener('DOMContentLoaded', function() {
    // Function to load and display JSON content
    function loadJSON() {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let jsonData = JSON.parse(xhr.responseText);
                displayContent(jsonData);
            }
        };

        xhr.open('GET', 'content.json', true);
        xhr.send();
    }

    // Function to display JSON content in the HTML
    function displayContent(data) {
        let container = document.getElementById('json-content');
        let html = '';
        let years = Object.keys(data).reverse();
        for (let key of years) {
            if (data.hasOwnProperty(key)) {
                let year = key;
                let yearId = `year-${year}`;
                html += `<h2 class="activity-year" data-toggle="collapse" data-target="#${yearId}" aria-expanded="true" aria-controls="${yearId}"><img class="icon_rotation" src="../../assets/0-expand_on.png" style="float:right;width:50px;height:50px" alt="" aria-hidden="true">${year}</h2><hr /><div id="${yearId}" class="collapse in"><ul>`;
                for (const entry of data[key]) {
                    html += `<li><p>${entry}</p></li>`;
                }
                html += `</ul></div><p><br /></p>`;
            }
        }
        container.innerHTML = html;

        $('#json-content .collapse').on('show.bs.collapse', function() {
            $(this)
                .prev('hr')
                .prev('.activity-year')
                .find('.icon_rotation')
                .attr('src', '../../assets/0-expand_on.png');
        });

        $('#json-content .collapse').on('hide.bs.collapse', function() {
            $(this)
                .prev('hr')
                .prev('.activity-year')
                .find('.icon_rotation')
                .attr('src', '../../assets/0-expand_off.png');
        });
    }

    // Load JSON content on page load
    loadJSON();
});
