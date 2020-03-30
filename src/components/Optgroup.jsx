import React, {Component} from "react";
import { Input } from 'reactstrap';

class Optgroup extends Component {
	render () {
		
        let itens = this.props.optionsList.map((optionsList) =>
			<option value={optionsList.value}>{optionsList.label}
			</option>
		);
		
        return (
			<optgroup>
				{itens}
			</optgroup>
        )
    }
	
}

export default Optgroup;
