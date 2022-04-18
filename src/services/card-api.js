function fetchCard(name, page = 1) {
    return fetch(`https://pixabay.com/api/?q=${name}&page=${page}&key=24956067-6fe14b7c875c9c2cf58e9b0bb&image_type=photo&orientation=horizontal&per_page=12`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(new Error(`No picture with name ${name}`))
                })
}

const api = {
    fetchCard,
};

export default api;