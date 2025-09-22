document.addEventListener('DOMContentLoaded', function() {
    var includes = document.querySelectorAll('[data-include]');
    
    includes.forEach(function(include) {
        var file = include.getAttribute('data-include');
        if (!file) return;
        
        fetch(file)
            .then(function(response) {
                if (!response.ok) throw new Error('File not found: ' + file);
                return response.text();
            })
            .then(function(data) {
                include.innerHTML = data;
                
                // Re-run validation script after content is loaded
                setTimeout(function() {
                    if (document.getElementById('validation_link_html')) {
                        document.getElementById('validation_link_html').href = 
                            "https://validator.w3.org/check?uri=" + location.href;
                    }
                    if (document.getElementById('validation_link_css')) {
                        document.getElementById('validation_link_css').href = 
                            "https://jigsaw.w3.org/validator/validator?uri=" + location.href;
                    }
                }, 100);
            })
            .catch(function(err) {
                console.warn('Include error:', err);
                include.innerHTML = '<p style="color: red;">Error loading: ' + file + '</p>';
            });
    });
});