import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import PageHeader from "../../ui/PageHeader";
import PageTitle from "../../ui/PageTitle";
import PotForm from "./PotForm";

function PotHeader() {
  return (
    <PageHeader>
      <PageTitle title={"Pots"} headingId="pots-title-id" />
      <Modal.Open modalName={"add-pot"}>
        <Button
          onClick={(e) => e.stopPropagation()}
          isActionButton={true}
          variant={"primary"}
        >
          + Add New Pot
        </Button>
      </Modal.Open>

      <Modal.Window
        titleId={"add-pot-title"}
        contentId={"add-pot-content"}
        potId={"pot"}
        modalName={"add-pot"}
      >
        <PotForm potModalType={`add-pot`} />
      </Modal.Window>
    </PageHeader>
  );
}

export default PotHeader;
