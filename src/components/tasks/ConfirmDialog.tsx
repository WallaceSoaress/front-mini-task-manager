import { Button, ModalActions, ModalBackdrop, ModalBody, ModalHeader, ModalPanel } from "./styles";

type ConfirmDialogProps = {
  title: string;
  message: string;
  confirmLabel: string;
  isLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmDialog({ title, message, confirmLabel, isLoading, onCancel, onConfirm }: ConfirmDialogProps) {
  return (
    <ModalBackdrop role="presentation">
      <ModalPanel role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <ModalHeader>
          <h2 id="confirm-title">{title}</h2>
          <Button type="button" $variant="ghost" onClick={onCancel} disabled={isLoading}>
            Fechar
          </Button>
        </ModalHeader>
        <ModalBody>
          <p>{message}</p>
          <ModalActions>
            <Button type="button" $variant="ghost" onClick={onCancel} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="button" $variant="danger" onClick={onConfirm} disabled={isLoading}>
              {isLoading ? "Excluindo..." : confirmLabel}
            </Button>
          </ModalActions>
        </ModalBody>
      </ModalPanel>
    </ModalBackdrop>
  );
}
