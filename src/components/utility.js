const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) {
        return "";
    }

    // Get the first character of each name and convert to uppercase
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();

    return `${firstInitial}${lastInitial}`;
};

const getFullName = (firstName, lastName) => {
    if (!firstName || !lastName) {
        return "";
    }
    return `${firstName} ${lastName}`;
};

export { getInitials, getFullName };