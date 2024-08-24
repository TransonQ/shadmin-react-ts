import { LegendCard, Page, RowAction } from "@/components/shared"

export const TableExample = () => {
  return (
    <Page title="TableExample">
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
