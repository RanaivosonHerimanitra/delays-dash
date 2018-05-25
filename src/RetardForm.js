import React from 'react'
import TraindId from './TrainId';

const RetardForm = ()=> {
    return(<form className="form-inline">>
              <div className="form-group">
                 <label>Identifiant Train</label>
                  <TraindId />

                  <label>Statut code</label>
                 <input value=""/>

             </div>
           </form>)
}
export default RetardForm;
