export const getErrorValue = (err, errMessage) => {
	if (err) {
		return err;
	}
	return errMessage && errMessage[0];
};
