import { LegendCard, Page } from "@/components/shared"
import { RowAction } from "@/components/shared/index-table"

export const TableExample = () => {
  return (
    <Page title="TableExample" fullWidth>
      <LegendCard>
        <RowAction
          actions={[{ content: "Edit0" }]}
          sections={[
            [{ content: "Edit1" }],
            [{ content: "Edit2", disabled: true }, { content: "Edit3" }],
          ]}
        />
      </LegendCard>
    </Page>
  )
}
