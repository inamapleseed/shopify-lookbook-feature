function showDetails(e) {
    const product = e.currentTarget;
    const details = product.querySelector('.lookbook_details');
    if (!details) return;
    // get click position
    const rect = product.getBoundingClientRect();
    const xFromLeft = e.clientX - rect.left;
    const xFromRight = rect.right - e.clientX;
    const yFromTop = e.clientY - rect.top;
    // calculate space to the right
    const distanceToRight = window.innerWidth - e.clientX;
    const detailsWidth = details.offsetWidth;
    
    // toggle product details container visibiltiy
    if (details.style.visibility === 'visible'){
        details.style.opacity = 0;
        details.style.visibility = "hidden";
        return;
    }

    // show details
    details.style.opacity = 1;
    details.style.visibility = "visible";
    details.style.top = `${yFromTop}px`;
    // adjust position to avoid overflow. if click is too close to the right edge then adjust the product details container to the left
    details.style.left = distanceToRight < detailsWidth
        ? `${xFromLeft - detailsWidth}px`
        : `${xFromLeft}px`;
        
    const hideDetails = () => {
        details.style.opacity = 0;
        details.style.visibility = "hidden";
        product.removeEventListener('mouseleave', hideDetails);
    };

    product.addEventListener('mouseleave', hideDetails);
}
