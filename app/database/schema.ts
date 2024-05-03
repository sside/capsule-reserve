import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createPinCode } from "~/library/createPinCode";

export const reserve = sqliteTable(
    "reserve",
    {
        id: integer("id").primaryKey({
            autoIncrement: true,
        }),
        createdAt: integer("createdAt", {
            mode: "timestamp",
        })
            .notNull()
            .$defaultFn(() => new Date()),
        updatedAt: integer("updatedAt", {
            mode: "timestamp",
        })
            .notNull()
            .$defaultFn(() => new Date())
            .$onUpdateFn(() => new Date()),
        customerName: text("customer_name").notNull(),
        mailAddress: text("mail_address").notNull(),
        startAt: integer("start_at", {
            mode: "timestamp",
        })
            .notNull()
            .$defaultFn(() => new Date()),
        endAt: integer("end_at", {
            mode: "timestamp",
        })
            .notNull()
            .$defaultFn(() => new Date()),
        reserveConfirmationPin: text("reserve_confirmation_pin", {
            length: 4,
        })
            .notNull()
            .$defaultFn(() => createPinCode()),
        cancelConfirmationPin: text("cancel_confirmation_pin", {
            length: 4,
        })
            .notNull()
            .$defaultFn(() => createPinCode()),
    },
    (table) => ({
        startAtIndex: index("start_at_index").on(table.startAt),
        endAtIndex: index("end_at_index").on(table.endAt),
    }),
);
