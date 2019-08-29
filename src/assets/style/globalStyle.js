const ellipsis = (clamp = 1) => {
    return `
     overflow: hidden;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-line-clamp: ${clamp};
     -webkit-box-orient: vertical;
    `
}

export default {
    ellipsis
}