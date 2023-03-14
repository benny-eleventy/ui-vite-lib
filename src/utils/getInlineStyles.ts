export const getInlineStyles = ({
	isLoading,
	isError,
	isSuccess,
	isActive,
	isDisabled,
	_loadingIndicatorStyles,
	_errorIndicatorStyles,
	_successIndicatorStyles,
	_activeIndicatorStyles,
	_disabledIndicatorStyles,
	styles,
}: {
	isLoading?: boolean | undefined;
	isError?: boolean | undefined;
	isSuccess?: boolean | undefined;
	isActive?: boolean | undefined;
	isDisabled?: boolean | undefined;
	_loadingIndicatorStyles?: React.CSSProperties | undefined;
	_errorIndicatorStyles?: React.CSSProperties | undefined;
	_successIndicatorStyles?: React.CSSProperties | undefined;
	_activeIndicatorStyles?: React.CSSProperties | undefined;
	_disabledIndicatorStyles?: React.CSSProperties | undefined;
	styles?: React.CSSProperties | undefined;
}) => {
	if (isLoading) {
		return _loadingIndicatorStyles;
	}
	if (isError) {
		return _errorIndicatorStyles;
	}
	if (isSuccess) {
		return _successIndicatorStyles;
	}
	if (isActive) {
		return _activeIndicatorStyles;
	}
	if (isDisabled) {
		return _disabledIndicatorStyles;
	} else {
		return styles;
	}
};
