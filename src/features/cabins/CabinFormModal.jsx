
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

 function CabinFormModal() {
   
    return (
      <div>
         <Modal>
        <Modal.Open opens="cabin-form"><Button>Add Cabin</Button></Modal.Open>
        <Modal.Window opensName="cabin-form"><CreateCabinForm></CreateCabinForm></Modal.Window>
       </Modal>
      </div>
      
    )
}

export default CabinFormModal
